import { screen } from '@testing-library/react';

import { setupWithRouter } from '@/test-utils/setupRender';

describe('Not Found Page', () => {
  it('should render a back to the main page button', async () => {
    setupWithRouter('/not-found');

    const button = await screen.findByRole('button', { name: /Back to the main page/i });
    expect(button).toBeInTheDocument();
  });

  it('should navigate to the main page on button click', async () => {
    const { user, router } = setupWithRouter('/not-found');

    await user.click(await screen.findByRole('button', { name: /Back to the main page/i }));

    expect(router.state.location.pathname).toBe('/');
  });
});
