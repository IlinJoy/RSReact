const REQUIREMENTS = [/[a-z]/, /[A-Z]/, /[0-9]/, /[@$!%*?&#]/];
const STRENGTH_KEYS = ['bad', 'medium', 'good'];

export const getPasswordStrength = (password?: string) => {
  if (!password) {
    return;
  }

  let errorAmount = 0;

  REQUIREMENTS.forEach((regex) => {
    if (!regex.test(password)) {
      errorAmount++;
    }
  });

  return calcStrengthByPercentage(errorAmount, REQUIREMENTS.length);
};

const calcStrengthByPercentage = (errorAmount: number, requirementsAmount: number) => {
  const percentage = (errorAmount / requirementsAmount) * 100;

  switch (true) {
    case percentage < 25:
      return STRENGTH_KEYS[2];
    case percentage < 50:
      return STRENGTH_KEYS[1];
    case percentage < 75:
      return STRENGTH_KEYS[0];
    default:
      return STRENGTH_KEYS[2];
  }
};
