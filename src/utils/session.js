const SESSION_KEY = 'deepam_session';

export function getSessionId() {
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

export function deviceType() {
  const width = window.innerWidth;
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

export function trackingMeta() {
  return {
    sessionId: getSessionId(),
    deviceType: deviceType(),
    referrer: document.referrer || '',
  };
}
