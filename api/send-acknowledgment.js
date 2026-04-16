const nodemailer = require('nodemailer');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'nandhakumarpkr@gmail.com';
const GMAIL_USER = process.env.GMAIL_USER || 'nandhakumarpkr@gmail.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD }
  });
}

function buildItemsHTML(items) {
  return items.map(item => `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #f0e6d6;font-size:14px;color:#333;">${item.emoji || '🌶️'} ${item.name}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f0e6d6;font-size:14px;color:#666;text-align:center;">${item.weight}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f0e6d6;font-size:14px;color:#666;text-align:center;">${item.qty}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f0e6d6;font-size:14px;color:#333;text-align:right;font-weight:600;">₹${item.total}</td>
    </tr>
  `).join('');
}

function acknowledgmentEmail(order) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#FDF6EC;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#fff;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#D42B2B,#8B1A1A);padding:30px 24px;text-align:center;">
      <div style="font-size:28px;margin-bottom:6px;">🪔</div>
      <h1 style="color:#F7C948;font-size:26px;margin:0;font-family:Georgia,serif;letter-spacing:2px;">AMBAL MASALA PODI</h1>
      <p style="color:#F5E6C8;font-size:11px;letter-spacing:3px;margin-top:4px;text-transform:uppercase;">Traditional Spice Blends from Erode</p>
    </div>

    <!-- Success Banner -->
    <div style="background:#1B7A3D;padding:16px 24px;text-align:center;">
      <span style="color:#fff;font-size:20px;margin-right:8px;">✅</span>
      <span style="color:#fff;font-size:16px;font-weight:700;letter-spacing:1px;">PAYMENT RECEIVED SUCCESSFULLY</span>
    </div>

    <!-- Order Info -->
    <div style="padding:28px 24px 10px;">
      <div style="background:#FDF6EC;border-left:4px solid #D42B2B;padding:14px 18px;margin-bottom:20px;">
        <p style="margin:0;font-size:13px;color:#888;">Order Number</p>
        <p style="margin:4px 0 0;font-size:22px;font-weight:800;color:#8B1A1A;letter-spacing:1px;">#${order.orderId}</p>
        <p style="margin:6px 0 0;font-size:12px;color:#999;">${order.date}</p>
      </div>

      <p style="font-size:15px;color:#333;margin-bottom:4px;">Dear <strong>${order.customerName}</strong>,</p>
      <p style="font-size:14px;color:#555;line-height:1.7;margin-bottom:20px;">
        Thank you for your order! Your payment of <strong style="color:#1B7A3D;">₹${order.total}</strong> has been received successfully.
        We are preparing your authentic Erode masala podis with love and care.
      </p>
    </div>

    <!-- Order Items Table -->
    <div style="padding:0 24px;">
      <h3 style="color:#8B1A1A;font-size:15px;margin-bottom:10px;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #D42B2B;padding-bottom:8px;">📦 Your Order</h3>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="background:#FDF6EC;">
            <th style="padding:10px 14px;text-align:left;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Item</th>
            <th style="padding:10px 14px;text-align:center;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Weight</th>
            <th style="padding:10px 14px;text-align:center;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Qty</th>
            <th style="padding:10px 14px;text-align:right;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${buildItemsHTML(order.items)}
        </tbody>
      </table>
    </div>

    <!-- Bill Summary -->
    <div style="padding:0 24px;margin-top:16px;">
      <div style="background:#FDF6EC;padding:16px 18px;border-radius:6px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
          <span style="font-size:13px;color:#666;">Subtotal</span>
          <span style="font-size:13px;color:#333;">₹${order.subtotal}</span>
        </div>
        ${order.discount > 0 ? `<div style="display:flex;justify-content:space-between;margin-bottom:6px;">
          <span style="font-size:13px;color:#1B7A3D;">Discount (15%)</span>
          <span style="font-size:13px;color:#1B7A3D;">-₹${order.discount}</span>
        </div>` : ''}
        <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
          <span style="font-size:13px;color:#666;">Delivery</span>
          <span style="font-size:13px;color:#333;">${order.delivery === 0 ? 'FREE' : '₹' + order.delivery}</span>
        </div>
        <div style="border-top:2px dashed #D42B2B;padding-top:10px;display:flex;justify-content:space-between;">
          <span style="font-size:16px;font-weight:800;color:#8B1A1A;">TOTAL</span>
          <span style="font-size:22px;font-weight:900;color:#D42B2B;">₹${order.total}</span>
        </div>
      </div>
    </div>

    <!-- Delivery Info -->
    <div style="padding:20px 24px;">
      <div style="background:linear-gradient(135deg,#FDF6EC,#F5E6C8);padding:16px 18px;border-radius:6px;border:1px dashed #D4A056;">
        <h4 style="margin:0 0 8px;color:#8B1A1A;font-size:13px;text-transform:uppercase;letter-spacing:1px;">📍 Delivery Address</h4>
        <p style="margin:0;font-size:14px;color:#333;line-height:1.6;">${order.address}</p>
        <p style="margin:6px 0 0;font-size:13px;color:#666;">📞 ${order.phone}</p>
      </div>
    </div>

    <!-- What's Next -->
    <div style="padding:0 24px 20px;">
      <div style="background:#8B1A1A;color:#fff;padding:18px;border-radius:6px;">
        <h4 style="margin:0 0 10px;color:#F7C948;font-size:14px;">🔔 What happens next?</h4>
        <p style="margin:0;font-size:13px;line-height:1.8;color:#F5E6C8;">
          📱 We will process your order and send a confirmation to your mobile number via SMS & WhatsApp.<br>
          📧 You'll receive an order confirmation email once accepted.<br>
          📦 Your order will be dispatched within 24 hours.<br>
          🚚 Live tracking link will be shared.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#1A0A00;padding:24px;text-align:center;">
      <p style="color:#F7C948;font-size:16px;font-weight:700;margin:0 0 6px;font-family:Georgia,serif;">AMBAL MASALA PODI</p>
      <p style="color:#F5E6C8;font-size:11px;margin:0 0 14px;opacity:.7;">Handcrafted with love from Erode, Tamil Nadu</p>
      <div style="margin-bottom:14px;">
        <a href="https://wa.me/917548873582" style="color:#25D366;text-decoration:none;font-size:13px;margin:0 10px;">📱 WhatsApp</a>
        <a href="https://instagram.com/your_username" style="color:#E1306C;text-decoration:none;font-size:13px;margin:0 10px;">📸 Instagram</a>
        <a href="mailto:nandhakumarpkr@gmail.com" style="color:#F7C948;text-decoration:none;font-size:13px;margin:0 10px;">📧 Email</a>
      </div>
      <p style="color:#666;font-size:10px;margin:0;">📞 +91 7548873582 | 📧 nandhakumarpkr@gmail.com</p>
      <p style="color:#555;font-size:10px;margin:6px 0 0;">© 2026 AMBAL Masala Podi. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
}

function adminNotificationEmail(order) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#fff;">
    <div style="background:#1A0A00;padding:20px 24px;text-align:center;">
      <h1 style="color:#F7C948;font-size:20px;margin:0;">🔔 NEW ORDER RECEIVED</h1>
    </div>
    <div style="padding:24px;">
      <div style="background:#FDF6EC;padding:16px;border-left:4px solid #D42B2B;margin-bottom:16px;">
        <p style="margin:0;font-size:20px;font-weight:800;color:#8B1A1A;">#${order.orderId}</p>
        <p style="margin:4px 0 0;font-size:12px;color:#999;">${order.date}</p>
      </div>

      <h3 style="color:#333;font-size:14px;">👤 Customer Details</h3>
      <p style="font-size:14px;color:#555;line-height:1.8;margin:4px 0 16px;">
        <strong>${order.customerName}</strong><br>
        📞 ${order.phone}<br>
        📧 ${order.customerEmail}<br>
        📍 ${order.address}
      </p>

      <h3 style="color:#333;font-size:14px;">📦 Order Items</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        ${buildItemsHTML(order.items)}
      </table>

      <div style="background:#D42B2B;color:#fff;padding:14px;text-align:center;border-radius:6px;margin-bottom:16px;">
        <span style="font-size:14px;">Total: </span>
        <strong style="font-size:22px;color:#F7C948;">₹${order.total}</strong>
      </div>

      <a href="${order.adminUrl}/admin.html?accept=${order.orderId}"
         style="display:block;background:#1B7A3D;color:#fff;text-align:center;padding:16px;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:1px;border-radius:6px;">
        ✅ ACCEPT THIS ORDER
      </a>
    </div>
  </div>
</body>
</html>`;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const order = req.body;
    if (!order || !order.customerEmail || !order.orderId) {
      return res.status(400).json({ error: 'Missing order data' });
    }

    order.date = new Date().toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Asia/Kolkata' });
    order.adminUrl = `https://${req.headers.host}`;

    const transporter = createTransporter();

    // Send acknowledgment to customer
    await transporter.sendMail({
      from: `AMBAL Masala Podi <${GMAIL_USER}>`,
      to: order.customerEmail,
      subject: `✅ Order Received — #${order.orderId} | AMBAL Masala Podi`,
      html: acknowledgmentEmail(order)
    });

    // Send notification to admin
    await transporter.sendMail({
      from: `AMBAL Orders <${GMAIL_USER}>`,
      to: ADMIN_EMAIL,
      subject: `🔔 New Order #${order.orderId} — ₹${order.total} | ${order.customerName}`,
      html: adminNotificationEmail(order)
    });

    res.status(200).json({ success: true, message: 'Acknowledgment sent' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Failed to send email', details: err.message });
  }
};
