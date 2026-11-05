export const GUEST_COOKIE = 'guest-mode';

export function enableGuestMode() {
  if (typeof document === 'undefined') return;
  document.cookie = `${GUEST_COOKIE}=1; path=/; max-age=2592000; samesite=lax`;
  window.localStorage.setItem(GUEST_COOKIE, '1');
}

export function disableGuestMode() {
  if (typeof document === 'undefined') return;
  document.cookie = `${GUEST_COOKIE}=; path=/; max-age=0; samesite=lax`;
  window.localStorage.removeItem(GUEST_COOKIE);
}
