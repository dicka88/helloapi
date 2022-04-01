import React from 'react';
import {
  createTheme,
  NextUIProvider,
} from '@nextui-org/react';
import useDarkMode from 'use-dark-mode';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';
import Index from './pages/index';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Signup from './pages/Signup';
import Signin from './pages/Signin';

export const queryClient = new QueryClient();

const App = () => {
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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectName" element={<ProjectDetail />} />
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </QueryClientProvider>
  );
};

export default App;
