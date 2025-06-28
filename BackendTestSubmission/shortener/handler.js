const service = require('./service');
const log = require('../../LoggingMiddleware/logs'); 

const BASE_URL = 'http://localhost:5000'; 

async function shortenUrl(req, res) {
  const { url, validity, shortcode } = req.body;
  if (!url) {
    await log('backend', 'error', 'handler', 'URL is required');
    return res.status(400).json({ error: 'URL is required' });
  }

  const result = service.createShortUrl(url, validity, shortcode);

  if (result.error === 'Invalid URL') {
    await log('backend', 'error', 'handler', 'Invalid URL');
    return res.status(400).json({ error: 'Invalid URL' });
  }

  if (result.error === 'Invalid shortcode format') {
    await log('backend', 'error', 'handler', 'Shortcode must be alphanumeric and 4-20 chars');
    return res.status(400).json({ error: 'Shortcode must be alphanumeric and 4-20 chars' });
  }

  if (result.error === 'Shortcode already exists') {
    await log('backend', 'error', 'handler', 'Shortcode already exists');
    return res.status(409).json({ error: 'Shortcode already exists' });
  }

  await log('backend', 'info', 'handler', `Short URL created: ${result.shortId}`);
  res.status(201).json({ shortLink: `${BASE_URL}/${result.shortId}`, expiry: new Date(result.expiresAt).toISOString() });

}

async function redirectUrl(req, res) {
  const { shortId } = req.params;
  const clickInfo = {
    timestamp: new Date().toISOString(),
    referrer: req.get('referer') || null,
    ip: req.ip
  };
  const result = service.resolveShortUrl(shortId, clickInfo);

  if (result.error === 'URL not found') {
    await log('backend', 'error', 'handler', `Shortcode does not exist: ${shortId}`);
    return res.status(404).json({ error: 'Shortcode does not exist' });
  }

  if (result.error === 'URL expired') {
    await log('backend', 'warn', 'handler', `Shortcode expired: ${shortId}`);
    return res.status(410).json({ error: 'Shortcode expired' });
  }

  await log('backend', 'info', 'handler', `Redirected: ${shortId}`);
  res.redirect(result.url);
}

async function getStats(req, res) {
  const { shortId } = req.params;
  const stats = service.getStats(shortId);
  if (stats.error) {
    await log('backend', 'error', 'handler', `Stats requested for non-existent shortcode: ${shortId}`);
    return res.status(404).json({ error: 'Shortcode does not exist' });
  }
  await log('backend', 'info', 'handler', `Stats retrieved for shortcode: ${shortId}`);
  res.json(stats);
}

module.exports = { shortenUrl, redirectUrl, getStats };