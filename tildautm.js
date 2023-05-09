
function firstClick() {
  if (document.cookie.split(';').some(cookie => cookie.trim().startsWith('TILDAUTM='))) {
    // The TILDAUTM cookie already exists
    return;
  }

  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    .filter(param => Boolean(new URLSearchParams(window.location.search).get(param)))
    .map(param => `${param}=${encodeURIComponent(new URLSearchParams(window.location.search).get(param))}`);
  
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 90);
  
  const referrer = document.referrer;
  const searchEngineRegex = /(google|nova\.rambler|yandex|yahoo|duckduckgo|bing)\./i;
  const referralRegex = /https?:\/\/([^/]+)/i;

  if (utmParams.length === 0) {
    if (referrer.match(searchEngineRegex)) {
      const searchEngine = referrer.match(searchEngineRegex)[1];
      utmParams.push(`utm_source=${searchEngine}`);
      utmParams.push('utm_medium=organic');
    } else if (referrer.match(referralRegex)) {
      const referralDomain = referrer.match(referralRegex)[1];
      utmParams.push(`utm_source=${referralDomain}`);
      utmParams.push('utm_medium=referral');
    } else {
      utmParams.push('utm_source=(direct)');
      utmParams.push('utm_medium=none');
    }
  }

  if (utmParams.length > 0) {
    document.cookie = `TILDAUTM=${utmParams.join('|||')}; path=/; expires=${expirationDate.toUTCString()}`;
  }
}

function lastValuable() {
  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    .filter(param => Boolean(new URLSearchParams(window.location.search).get(param)))
    .map(param => `${param}=${encodeURIComponent(new URLSearchParams(window.location.search).get(param))}`);
  const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 90);
  const referrer = document.referrer;
  const searchEngineRegex = /(google|nova\.rambler|yandex|yahoo|duckduckgo|bing)\./i;
  const referralRegex = /https?:\/\/([^/]+)/i;

  if (referrer.match(searchEngineRegex)) {
    const searchEngine = referrer.match(searchEngineRegex)[1];
    utmParams.push(`utm_source=${searchEngine}`);
    utmParams.push('utm_medium=organic');
  } else if (referrer.match(referralRegex)) {
    const referralDomain = referrer.match(referralRegex)[1];
    utmParams.push(`utm_source=${referralDomain}`);
    utmParams.push('utm_medium=referral');
  }

  if (utmParams.length > 0) {
    document.cookie = `TILDAUTM=${utmParams.join('|||')}; path=/;`;
  } else if (!document.cookie.split(';').some(cookie => cookie.trim().startsWith('TILDAUTM='))) {
    document.cookie = `TILDAUTM=utm_source=(direct)|||utm_medium=none; path=/; expires=${expirationDate.toUTCString()}`;
  }
}


function lastClick() {
  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    .filter(param => Boolean(new URLSearchParams(window.location.search).get(param)))
    .map(param => `${param}=${encodeURIComponent(new URLSearchParams(window.location.search).get(param))}`);
  const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 90);
  const referrer = document.referrer;
  const searchEngineRegex = /(google|nova\.rambler|yandex|yahoo|duckduckgo|bing)\./i;
  const referralRegex = /https?:\/\/([^/]+)/i;

  if (referrer.match(searchEngineRegex)) {
    const searchEngine = referrer.match(searchEngineRegex)[1];
    utmParams.push(`utm_source=${searchEngine}`);
    utmParams.push('utm_medium=organic');
  } else if (referrer.match(referralRegex)) {
    const referralDomain = referrer.match(referralRegex)[1];
    utmParams.push(`utm_source=${referralDomain}`);
    utmParams.push('utm_medium=referral');
  }

  if (utmParams.length > 0) {
    document.cookie = `TILDAUTM=${utmParams.join('|||')}; path=/; expires=${expirationDate.toUTCString()}`;
  } else {
    document.cookie = `TILDAUTM=utm_source=(direct)|||utm_medium=none; path=/; expires=${expirationDate.toUTCString()}`;
  }
}

function setAttributionModel(model) {
  switch(model) {
    case 'last_click':
      lastClick();
      break;
    case 'first_click':
      firstClick();
      break;
    case 'last_valuable_click':
      lastValuable();
      break;
    default:
      console.error(`Invalid attribution model: ${model}`);
  }
}
