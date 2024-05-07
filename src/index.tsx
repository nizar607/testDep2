import { createRoot } from 'react-dom/client';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Importez GoogleOAuthProvider

import { MetronicI18nProvider } from './_metronic/i18n/Metronici18n';
import './_metronic/assets/fonticon/fonticon.css';
import './_metronic/assets/keenicons/duotone/style.css';
import './_metronic/assets/keenicons/outline/style.css';
import './_metronic/assets/keenicons/solid/style.css';
import './_metronic/assets/sass/style.scss';
import './_metronic/assets/sass/plugins.scss';
import './_metronic/assets/sass/style.react.scss';
import { AppRoutes } from './app/routing/AppRoutes';
import { AuthProvider, setupAxios } from './app/modules/auth';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './redux/store';


setupAxios(axios);
Chart.register(...registerables);

const queryClient = new QueryClient();
const container = document.getElementById('root');



if (container) {
  createRoot(container).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId="430621675041-97e4t4mj4t67jv4ror7d733sbju6di8l.apps.googleusercontent.com">
          <QueryClientProvider client={queryClient}>
            <MetronicI18nProvider>
              <AuthProvider>
                <AppRoutes />
              </AuthProvider>
            </MetronicI18nProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}
