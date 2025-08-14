import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { ThemeContextProvider } from '@/context/theme/ThemeContext';
import { router } from '@/router/router';
import { store } from '@/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <RouterProvider router={router} />
      </ThemeContextProvider>
    </Provider>
  );
}
