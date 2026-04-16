const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

function confirmationEmail(order) {
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

    <!-- Confirmed Banner -->
    <div style="background:linear-gradient(135deg,#1B7A3D,#2D6A27);padding:24px;text-align:center;">
      <div style="font-size:48px;margin-bottom:8px;">🎉</div>
      <h2 style="color:#fff;font-size:20px;margin:0;letter-spacing:1px;">ORDER CONFIRMED!</h2>
      <p style="color:#a8e6b4;font-size:13px;margin-top:6px;">Your order has been processed and is being prepared</p>
    </div>

    <!-- Main Content -->
    <div style="padding:28px 24px;">
      <p style="font-size:15px;color:#333;margin-bottom:4px;">Dear <strong>${order.customerName}</strong>,</p>
      <p style="font-size:14px;color:#555;line-height:1.7;margin-bottom:20px;">
        Great news! We have processed your order <strong style="color:#8B1A1A;">#${order.orderId}</strong>
        and it will be delivered soon to your address. Our team is carefully packing your authentic Erode masala podis.
      </p>

      <!-- Delivery Details Card -->
      <div style="background:linear-gradient(135deg,#FDF6EC,#F5E6C8);border:2px solid #D4A056;border-radius:8px;padding:20px;margin-bottom:20px;">
        <h3 style="color:#8B1A1A;font-size:14px;margin:0 0 14px;text-transform:uppercase;letter-spacing:1px;">🚚 Delivery Details</h3>

        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#888;width:100px;vertical-align:top;">👤 Name</td>
            <td style="padding:8px 0;font-size:14px;color:#333;font-weight:700;">${order.customerName}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#888;vertical-align:top;">📍 Address</td>
            <td style="padding:8px 0;font-size:14px;color:#333;line-height:1.5;">${order.address}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#888;">📞 Phone</td>
            <td style="padding:8px 0;font-size:14px;color:#333;">${order.phone}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#888;">📧 Email</td>
            <td style="padding:8px 0;font-size:14px;color:#333;">${order.customerEmail}</td>
          </tr>
        </table>
      </div>

      <!-- Order Summary -->
      <div style="background:#fff;border:1px solid #eee;border-radius:8px;padding:16px;margin-bottom:20px;">
        <h3 style="color:#8B1A1A;font-size:14px;margin:0 0 10px;text-transform:uppercase;letter-spacing:1px;">📦 Order Summary</h3>
        ${order.items.map(item => `
          <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f5f5f5;">
            <span style="font-size:13px;color:#333;">${item.emoji || '🌶️'} ${item.name} (${item.weight}) × ${item.qty}</span>
            <span style="font-size:13px;color:#333;font-weight:600;">₹${item.total}</span>
          </div>
        `).join('')}
        <div style="display:flex;justify-content:space-between;padding:12px 0 0;margin-top:8px;border-top:2px dashed #D42B2B;">
          <span style="font-size:16px;font-weight:800;color:#8B1A1A;">TOTAL PAID</span>
          <span style="font-size:20px;font-weight:900;color:#D42B2B;">₹${order.total}</span>
        </div>
      </div>

      <!-- Timeline -->
      <div style="background:#8B1A1A;color:#fff;padding:18px;border-radius:8px;">
        <h4 style="margin:0 0 12px;color:#F7C948;font-size:13px;letter-spacing:1px;">📋 ORDER TIMELINE</h4>
        <div style="font-size:13px;line-height:2;color:#F5E6C8;">
          <div>✅ Payment Received</div>
          <div>✅ Order Confirmed</div>
          <div>📦 Packing in Progress...</div>
          <div>🚚 Will be dispatched within 24 hours</div>
          <div>📍 Tracking link will be shared via WhatsApp</div>
        </div>
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

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const order = req.body;
    if (!order || !order.customerEmail || !order.orderId) {
      return res.status(400).json({ error: 'Missing order data' });
    }

    await resend.emails.send({
      from: 'AMBAL Masala Podi <onboarding@resend.dev>',
      to: order.customerEmail,
      subject: `🎉 Order Confirmed — #${order.orderId} | Delivering Soon! | AMBAL Masala Podi`,
      html: confirmationEmail(order)
    });

    res.status(200).json({ success: true, message: 'Confirmation sent' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Failed to send email', details: err.message });
  }
};
