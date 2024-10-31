import aspectRatio from '@tailwindcss/aspect-ratio';
import flowbitePlugin from 'flowbite/plugin'
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {},
    colors: {
      'eerieblack': '#222222ff',
      'pumpkin': '#ff6600ff',
      'uclablue': '#337ab7ff',
      'onyx': '#343742ff',
      'charcoal': '#474b5aff',
      'dimGray': '#676a73ff',
      'gray': '#777777ff',
      'platinum': '#d4dae3ff',
      'platinum2': '#e5e5e5ff',
      'seasalt': '#f8f8faff',
    }
  },
  vite: {
    optimizeDeps: {
      include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep']
    }
  },

  plugins: [typography, forms, containerQueries, aspectRatio, flowbitePlugin]
  } as Config;

