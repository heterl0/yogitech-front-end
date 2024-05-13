// src/theme/index.tsx
 
'use client';
 
import { useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider, ThemeOptions } from '@mui/material/styles';
import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
import { customShadows } from './custom-shadows';
import { componentsOverrides } from './overrides';
import NextAppDirEmotionCacheProvider from './next-emotion-cache';
 
type Props = {
  children: React.ReactNode;
};
 
export default function ThemeProvider({ children }: Props) {
  const memoizedValue = useMemo(
    () => ({
      palette: palette('light'), // or palette('dark')
      shadows: shadows('light'), // or shadows('dark')
      customShadows: customShadows('light'), // or customShadows('dark')
      shape: { borderRadius: 8 },
      typography,
    }),
    []
  );
 
  const theme = createTheme(memoizedValue as ThemeOptions);
 
  theme.components = componentsOverrides(theme);
 
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}