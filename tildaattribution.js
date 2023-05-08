
function firstClick() {
  if (document.cookie.split(';').some(cookie => cookie.trim().startsWith('TILDAUTM='))) {
    // The TILDAUTM cookie already exists
    return;
  }

  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    .filter(param => Boolean(new URLSearchParams(window.location.search).get(param)))
    .map(param => `${param}=${encodeURIComponent(new URLSearchParams(window.location.search).get(param))}`);

  const referrer = document.referrer;
  const searchEngineRegex = /(google|yahoo|bing|yandex|baidu|duckduckgo)\./i;
  const referralRegex = /https?:\/\/([^/]+)/i;

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

  if (utmParams.length > 0) {
    document.cookie = `TILDAUTM=${utmParams.join('|||')}; path=/;`;
  }
}

function lastValuable() {
  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    .filter(param => Boolean(new URLSearchParams(window.location.search).get(param)))
    .map(param => `${param}=${encodeURIComponent(new URLSearchParams(window.location.search).get(param))}`);

  const referrer = document.referrer;
  const searchEngineRegex = /(google|yahoo|bing|yandex|baidu|duckduckgo)\./i;
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
    document.cookie = 'TILDAUTM=utm_source=(direct)|||utm_medium=none; path=/;';
  }
}


function lastClick() {
  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    .filter(param => Boolean(new URLSearchParams(window.location.search).get(param)))
    .map(param => `${param}=${encodeURIComponent(new URLSearchParams(window.location.search).get(param))}`);

  const referrer = document.referrer;
  const searchEngineRegex = /(google|yahoo|bing|yandex|baidu|duckduckgo)\./i;
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
  } else {
    document.cookie = 'TILDAUTM=utm_source=(direct)|||utm_medium=none; path=/;';
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

const model = 'last_click'; // replace with desired attribution model
setAttributionModel(model);