import { screen, within } from '@testing-library/react';

import { db } from '@/test-utils/mocks/db';
import { setupWithRouter } from '@/test-utils/setupRender';

describe('AnimeDetails', () => {
  it('should display data correctly', async () => {
    const {
      title,
      title_english,
      episodes,
      duration,
      year,
      images: { webp },
      genres,
    } = db.anime[1];

    setupWithRouter('/1/1');

    const detailsCard = await screen.findByLabelText('details');
    const { getByText, findByRole } = within(detailsCard);

    const image = await findByRole('img');
    expect(image).toHaveAttribute('src', webp.large_image_url);
    expect(image).toHaveAttribute('alt', `${title} detailed cover`);

    expect(getByText(title_english || title)).toBeInTheDocument();

    expect(getByText(`episodes: ${episodes}`)).toBeInTheDocument();
    expect(getByText(`duration: ${duration}`)).toBeInTheDocument();
    expect(getByText(`year: ${year}`)).toBeInTheDocument();

    const genresList = await findByRole('list');
    const genreItems = within(genresList).getAllByRole('listitem');
    expect(genreItems).toHaveLength(genres.length);

    expect(screen.getByLabelText('back to list')).toBeInTheDocument();
  });

  it('should navigate back when close button is clicked', async () => {
    const { user, router } = setupWithRouter('/1/1');

    const closeButton = await screen.findByLabelText('back to list');
    await user.click(closeButton);

    expect(router.state.location.pathname).toBe('/1');
  });
});
