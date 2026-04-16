const nodemailer = require('nodemailer');

const GMAIL_USER = process.env.GMAIL_USER || 'nandhakumarpkr@gmail.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

function followupEmail(order) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#FDF6EC;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#fff;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#E8723A,#D42B2B,#8B1A1A);padding:30px 24px;text-align:center;">
      <div style="font-size:36px;margin-bottom:8px;">🌶️✨</div>
      <h1 style="color:#F7C948;font-size:24px;margin:0;font-family:Georgia,serif;letter-spacing:2px;">AMBAL MASALA PODI</h1>
      <p style="color:#F5E6C8;font-size:11px;letter-spacing:3px;margin-top:4px;text-transform:uppercase;">Traditional Spice Blends from Erode</p>
    </div>

    <!-- Greeting -->
    <div style="padding:30px 24px 10px;text-align:center;">
      <div style="font-size:42px;margin-bottom:12px;">😊</div>
      <h2 style="color:#8B1A1A;font-size:22px;margin:0;font-family:Georgia,serif;">How was your experience?</h2>
      <p style="color:#666;font-size:14px;margin-top:8px;line-height:1.6;">
        Hi <strong>${order.customerName}</strong>! It's been 2 weeks since your AMBAL Masala Podi was delivered.
        We'd love to hear what you think!
      </p>
    </div>

    <!-- Review CTA -->
    <div style="padding:10px 24px 20px;">
      <div style="background:linear-gradient(135deg,#FDF6EC,#F5E6C8);border:2px solid #D4A056;border-radius:12px;padding:24px;text-align:center;">
        <div style="font-size:32px;margin-bottom:10px;">⭐⭐⭐⭐⭐</div>
        <h3 style="color:#8B1A1A;font-size:18px;margin:0 0 8px;font-family:Georgia,serif;">Share Your Review</h3>
        <p style="color:#666;font-size:13px;margin-bottom:16px;line-height:1.5;">
          Your feedback helps other customers discover authentic Erode masalas and helps us serve you better!
        </p>
        <a href="${order.siteUrl}#reviews"
           style="display:inline-block;background:linear-gradient(135deg,#D42B2B,#8B1A1A);color:#fff;text-decoration:none;padding:14px 32px;font-weight:700;font-size:14px;letter-spacing:1px;border-radius:6px;">
          ✍️ WRITE A REVIEW
        </a>
      </div>
    </div>

    <!-- Instagram Follow -->
    <div style="padding:0 24px 20px;">
      <div style="background:linear-gradient(135deg,#833AB4,#FD1D1D,#F77737);border-radius:12px;padding:24px;text-align:center;">
        <div style="font-size:36px;margin-bottom:10px;">📸</div>
        <h3 style="color:#fff;font-size:18px;margin:0 0 8px;font-family:Georgia,serif;">Follow Us on Instagram!</h3>
        <p style="color:rgba(255,255,255,.85);font-size:13px;margin-bottom:16px;line-height:1.5;">
          Get recipe ideas, behind-the-scenes content, new product launches, and exclusive offers!
        </p>
        <a href="https://instagram.com/your_username"
           style="display:inline-block;background:#fff;color:#E1306C;text-decoration:none;padding:12px 28px;font-weight:700;font-size:14px;letter-spacing:1px;border-radius:30px;">
          📷 FOLLOW @AMBALMASALA
        </a>
      </div>
    </div>

    <!-- WhatsApp -->
    <div style="padding:0 24px 20px;">
      <div style="background:#25D366;border-radius:12px;padding:20px;text-align:center;">
        <div style="font-size:32px;margin-bottom:8px;">💬</div>
        <h3 style="color:#fff;font-size:16px;margin:0 0 8px;">Reorder on WhatsApp!</h3>
        <p style="color:rgba(255,255,255,.85);font-size:13px;margin-bottom:14px;">
          Quick reorder? Just send us a message — we'll handle the rest!
        </p>
        <a href="https://wa.me/917548873582?text=Hi%20AMBAL%20Masala!%20I%20would%20like%20to%20reorder.%20My%20previous%20order%20was%20%23${order.orderId}"
           style="display:inline-block;background:#fff;color:#25D366;text-decoration:none;padding:12px 28px;font-weight:700;font-size:14px;border-radius:30px;">
          📱 MESSAGE US
        </a>
      </div>
    </div>

    <!-- Special Offer -->
    <div style="padding:0 24px 20px;">
      <div style="background:#1A0A00;border-radius:12px;padding:24px;text-align:center;border:2px solid #F7C948;">
        <div style="font-size:28px;margin-bottom:8px;">🎁</div>
        <h3 style="color:#F7C948;font-size:18px;margin:0 0 6px;font-family:Georgia,serif;">Loyal Customer Offer!</h3>
        <div style="color:#F7C948;font-size:36px;font-weight:900;margin:8px 0;font-family:Georgia,serif;">10% OFF</div>
        <p style="color:#F5E6C8;font-size:13px;margin-bottom:14px;">Use code on your next order</p>
        <div style="background:#D42B2B;display:inline-block;padding:10px 24px;border-radius:4px;border:2px dashed #F7C948;">
          <span style="color:#F7C948;font-size:18px;font-weight:800;letter-spacing:3px;font-family:monospace;">AMBAL10</span>
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

    order.siteUrl = `https://${req.headers.host}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD }
    });

    await transporter.sendMail({
      from: `AMBAL Masala Podi <${GMAIL_USER}>`,
      to: order.customerEmail,
      subject: `⭐ How was your AMBAL Masala? Share your review & get 10% OFF! 🎁`,
      html: followupEmail(order)
    });

    res.status(200).json({ success: true, message: 'Follow-up sent' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Failed to send email', details: err.message });
  }
};
