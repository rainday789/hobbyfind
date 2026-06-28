export function redirectGuestToLogin(
  router: { push: (href: string) => void },
  returnPath: string,
) {
  const params = new URLSearchParams({
    callbackUrl: returnPath,
    from: 'bookmark',
  });
  router.push(`/login?${params.toString()}`);
}
