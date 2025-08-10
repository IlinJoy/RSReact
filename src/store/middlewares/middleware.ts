import { isFulfilled, type Middleware } from '@reduxjs/toolkit';

export const DELAY = 400;

export const delayedFulfilledMiddleware: Middleware = () => (next) => (action) => {
  if (isFulfilled(action)) {
    setTimeout(() => next(action), DELAY);
    return;
  }

  return next(action);
};
