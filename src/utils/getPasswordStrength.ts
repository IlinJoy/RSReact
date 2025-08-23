const REQUIREMENTS_AMOUNT = 5;
const STRENGTH_KEYS = ['invalid', 'bad', 'medium', 'good'];

export const getPasswordStrength = (errorAmount?: number) => {
  if (!errorAmount) {
    return;
  }

  const percentage = (errorAmount / REQUIREMENTS_AMOUNT) * 100;
  switch (true) {
    case percentage < 25:
      return STRENGTH_KEYS[3];
    case percentage < 50:
      return STRENGTH_KEYS[2];
    case percentage < 75:
      return STRENGTH_KEYS[1];
    default:
      return STRENGTH_KEYS[0];
  }
};
