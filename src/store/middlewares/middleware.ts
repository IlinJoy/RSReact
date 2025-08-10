import { isFulfilled, type Middleware } from '@reduxjs/toolkit';

export const delayedFulfilledMiddleware: Middleware = () => (next) => (action) => {
  if (isFulfilled(action)) {
    const delay = 500;
    setTimeout(() => next(action), delay);
    return;
  }

  return next(action);
};
