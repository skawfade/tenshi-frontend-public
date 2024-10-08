/** @type {import('tailwindcss').Config} */

import { nextui } from '@nextui-org/react'
import withMT from '@material-tailwind/react/utils/withMT'

// ... существующий код ...

export default withMT({
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    nextui({
      defaultTheme: 'light'
    })
    // Добавьте ваш плагин
  ]
})
