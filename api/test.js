module.exports = function handler(req, res) {
  res.status(200).json({
    ok: true,
    env: {
      hasGmailUser: !!process.env.GMAIL_USER,
      hasGmailPassword: !!process.env.GMAIL_APP_PASSWORD,
      hasAdminEmail: !!process.env.ADMIN_EMAIL
    },
    time: new Date().toISOString()
  });
};
