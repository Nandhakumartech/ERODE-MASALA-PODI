const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// Firebase Admin init for server-side
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBIatWDx7xcLdcQcmSo_ek2-QEhz3eJEsg",
  authDomain: "erode-masala.firebaseapp.com",
  projectId: "erode-masala"
};

module.exports = async function handler(req, res) {
  // This endpoint is called by Vercel Cron daily
  // It checks for follow-ups due today and sends emails

  try {
    // Use REST API to query Firestore (no admin SDK needed)
    const now = new Date();
    const projectId = FIREBASE_CONFIG.projectId;
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/followups`;

    const response = await fetch(url);
    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch followups' });
    }

    const data = await response.json();
    const documents = data.documents || [];
    let sentCount = 0;

    for (const doc of documents) {
      const fields = doc.fields;
      if (!fields) continue;

      const sent = fields.sent?.booleanValue;
      if (sent) continue;

      const scheduledAt = fields.scheduledAt?.timestampValue;
      if (!scheduledAt) continue;

      const scheduledDate = new Date(scheduledAt);
      if (scheduledDate > now) continue;

      // Due for follow-up
      const customerEmail = fields.customerEmail?.stringValue;
      const customerName = fields.customerName?.stringValue || 'Customer';
      const orderId = fields.orderId?.stringValue || 'N/A';

      if (!customerEmail) continue;

      const siteUrl = `https://${req.headers.host}`;

      // Send follow-up email via the send-followup API
      await fetch(`https://${req.headers.host}/api/send-followup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail,
          customerName,
          orderId,
          siteUrl
        })
      });

      // Mark as sent via Firestore REST API
      const docPath = doc.name;
      await fetch(`https://firestore.googleapis.com/v1/${docPath}?updateMask.fieldPaths=sent`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: { sent: { booleanValue: true } }
        })
      });

      sentCount++;
    }

    res.status(200).json({ success: true, sent: sentCount });
  } catch (err) {
    console.error('Cron error:', err);
    res.status(500).json({ error: err.message });
  }
};
