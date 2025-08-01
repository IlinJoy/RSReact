import { render, screen } from '@testing-library/react';

import { AboutPage } from '@/pages/AboutPage/AboutPage';

describe('About Page', () => {
  it('should render a link with correct href', () => {
    render(<AboutPage />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });
});
