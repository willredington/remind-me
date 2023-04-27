import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  // styles: {
  //   global: {
  //     'html, body': {
  //       backgroundColor: 'gray.50',
  //     },
  //   },
  // },
});
