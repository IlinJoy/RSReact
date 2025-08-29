export const withId = <T extends object>(data: T) => ({ ...data, id: crypto.randomUUID() });
