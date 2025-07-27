export const checkIsValidNumberPath = (path: number) => {
  if (isNaN(path) || path <= 0) {
    throw new Response('', { status: 404 });
  }
};
