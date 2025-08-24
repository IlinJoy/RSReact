import { act } from '@testing-library/react';

import { type InfoOutput, useInfoOutputStore } from '@/store/infoOutputStore';

const initialState = useInfoOutputStore.getState();

const mockDataToSet: InfoOutput = {
  name: 'Name',
  age: 1,
  email: 'mail@mail.com',
  country: 'Canada',
  password: 'Asd12!',
  confirmPassword: 'Asd12!',
  tc: true,
  gender: 'male',
  form: 'controlled',
  image: 'image',
};

describe('InfoOutput Store', () => {
  beforeEach(() => useInfoOutputStore.setState(initialState));

  it('should have initial empty state', () => {
    const state = useInfoOutputStore.getState();
    expect(state.infoOutput).toEqual([]);
  });

  it('should add new info', () => {
    const {
      actions: { setNewInfo },
    } = useInfoOutputStore.getState();

    act(() => {
      setNewInfo(mockDataToSet);
    });

    const state = useInfoOutputStore.getState();
    expect(state.infoOutput).toHaveLength(1);
    expect(state.infoOutput[0]).toEqual(mockDataToSet);
  });
});
