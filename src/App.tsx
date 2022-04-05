import React from 'react';
import {
  createTheme,
  NextUIProvider,
} from '@nextui-org/react';
import useDarkMode from 'use-dark-mode';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

import Index from './pages/index';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Settings from './pages/Settings';
import Invoices from './pages/Invoices';
import EndpointDetail from './components/EndpointDetail/EndpointDetail';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

export const queryClient = new QueryClient();

const App: React.FC = () => {
  const lightTheme = createTheme({
    type: 'light',
  });
  const darkTheme = createTheme({
    type: 'dark',
  });

  const darkMode = useDarkMode(false);

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route index element={<Index />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/projects"
              element={(
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
            )}
            />
            <Route
              path="/projects/:prefixPath"
              element={(
                <ProtectedRoute>
                  <ProjectDetail />
                </ProtectedRoute>
            )}
            >
              <Route path=":path" element={<EndpointDetail />} />
              <Route path="*" element={<span>Not found</span>} />
            </Route>
            <Route
              path="/settings"
              element={(
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/invoices"
              element={(
                <ProtectedRoute>
                  <Invoices />
                </ProtectedRoute>
              )}
            />
            <Route path="*" element={<span>Page is not found</span>} />
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </QueryClientProvider>
  );
};

export default App;
