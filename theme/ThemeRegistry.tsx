'use client';

import { red } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Kanit } from 'next/font/google';
import * as React from 'react';
import { NextAppDirEmotionCacheProvider } from './EmotionCache';

//>>Add type
declare module '@mui/material/styles' {
  interface Palette {
    myAwesomeColor: string;
  }
  interface PaletteOptions {
    myAwesomeColor: string;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    myAwesomeColor: true;
  }
}

const kanit = Kanit({
  weight: ['300', '400', '500', '700'],
  style: ['normal'],
  subsets: ['latin']
});

const theme = createTheme({
  typography: {
    fontFamily: kanit.style.fontFamily,
    fontSize: 14,
    fontWeightBold: 'normal'
  },
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    myAwesomeColor: '#0A6EE1',
    error: {
      main: red.A400
    }
  }
});

export default function ThemeRegistry({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}