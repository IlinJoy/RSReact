import { screen } from '@testing-library/react';

import { ERROR_MESSAGES } from '@/constants/messages';
import { setupUserEvent } from '@/test-utils/setupUserEvent';

import { ErrorButton } from './ErrorButton';

describe('ErrorButton Component', () => {
  describe('Error Trigger', () => {
    it('should throw error when test button is clicked', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      const { user } = setupUserEvent(<ErrorButton />);

      await expect(async () => {
        await user.click(screen.getByRole('button', { name: /Throw Error/i }));
      }).rejects.toThrow(ERROR_MESSAGES.TEST);
    });
  });
});
