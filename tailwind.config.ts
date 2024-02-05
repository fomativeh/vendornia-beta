import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/scopedComponents/vendor/**/*.{js,ts,jsx,tsx,mdx}',
    './src/scopedComponents/product/**/*.{js,ts,jsx,tsx,mdx}',
    './src/scopedComponents/vendor/*.{js,ts,jsx,tsx,mdx}',
    './src/scopedComponents/vendors/*.{js,ts,jsx,tsx,mdx}',
    './src/scopedComponents/product/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        "mobile": "420px",
        "tablet": "640px",
        "tabletX":"690px",
        "smallDesktop": "768px",
        "sidebar-bk": "950px",
        "X2":"1200px",
        "largeDesktop": "1024px",
        "XL": "1600px"
      },
      colors: {
        primary_bg: "#fff",
        customYellow: "#BBBB0C",
        themeBlue: "#00007F"
      }
    },
  },
  plugins: [],
}
export default config
