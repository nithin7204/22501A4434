const { nanoid } = require('nanoid');
const repository = require('./repository');

const DEFAULT_EXPIRY = 30 * 60 * 1000;

function isValidShortcode(shortcode) {
  return typeof shortcode === 'string' && /^[a-zA-Z0-9]{4,20}$/.test(shortcode);
}

function createShortUrl(url, validity, shortcode) {
  try {
    new URL(url);
  } catch {
    return { error: 'Invalid URL' };
  }

  let shortId = shortcode;
  if (shortId) {
    if (!isValidShortcode(shortId)) return { error: 'Invalid shortcode format' };
    if (repository.getUrl(shortId)) return { error: 'Shortcode already exists' };
  } else {
    do {
      shortId = nanoid(8);
    } while (repository.getUrl(shortId));
  }

  const expiresAt = Date.now() + ((validity ? validity : 30) * 60 * 1000);
  repository.saveUrl(shortId, url, expiresAt);
  return { shortId, expiresAt };
}

function resolveShortUrl(shortId, clickInfo) {
  const entry = repository.getUrl(shortId);
  if (!entry) return { error: 'URL not found' };
  if (Date.now() > entry.expiresAt) {
    repository.deleteUrl(shortId);
    return { error: 'URL expired' };
  }
  repository.incrementClick(shortId, clickInfo);
  return { url: entry.url };
}

function getStats(shortId) {
  const entry = repository.getUrl(shortId);
  if (!entry) return { error: 'URL not found' };
  return {
    url: entry.url,
    createdAt: entry.createdAt,
    expiry: new Date(entry.expiresAt).toISOString(),
    totalClicks: entry.clicks,
    clickData: entry.clickData
  };
}

module.exports = { createShortUrl, resolveShortUrl, getStats };