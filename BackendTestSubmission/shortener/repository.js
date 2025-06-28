const urlStore = {};

function saveUrl(shortId, url, expiresAt) {
  urlStore[shortId] = {
    url,
    expiresAt,
    createdAt: new Date().toISOString(),
    clicks: 0,
    clickData: []
  };
}

function getUrl(shortId) {
  return urlStore[shortId];
}

function deleteUrl(shortId) {
  delete urlStore[shortId];
}

function incrementClick(shortId, clickInfo) {
  if (urlStore[shortId]) {
    urlStore[shortId].clicks += 1;
    urlStore[shortId].clickData.push(clickInfo);
  }
}

module.exports = { saveUrl, getUrl, deleteUrl, incrementClick };