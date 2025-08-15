import { render, screen } from '@testing-library/react';

import { About } from '@/pages/AboutPage/About';

describe('About Page', () => {
  it('should render a link with correct href', () => {
    render(<About />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });
});
