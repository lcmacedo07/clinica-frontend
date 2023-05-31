const global = require('./global')
const pkg = require('./package')

export default defineNuxtConfig({
  ssr: false,

  app: {
    head: {
      title: (global.appname || 'GEP'),
      meta: [
        { name: 'author', content: 'MACEDO' },
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: global.description || '' },
        { name: 'author', content: global.author },
        { name: 'robots', content: 'index,follow' },
        { property: 'og:locale', content: 'pt_BR' },
        { property: 'og:site_name', content: 'GEP' },
        { property: 'og:type', content: 'website' },
      ],

      link: [
        { hid: 'canonical', href: `${global.urlSite}` },
        { rel: 'icon', type: 'image/png', href: '/32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/32.png' },
        { rel: 'icon', type: 'image/png', sizes: '57x57', href: '/icons/57.png' },
        { rel: 'icon', type: 'image/png', sizes: '72x72', href: '/icons/72.png' },
        { rel: 'icon', type: 'image/png', sizes: '114x114', href: '/icons/114.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icons/192.png' },
      ],
      script: [],
    },
  },

  css: [
    '@unocss/reset/tailwind.css',
    '@/public/css/main.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  modules: [
    '@nuxt/image-edge',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    ['nuxt3-breakpoints', { sm: 576, md: 768, lg: 992, xl: 1200 }],
    '@element-plus/nuxt',
    '@sidebase/nuxt-pdf',
  ],
  elementPlus: {
    icon: 'ElIcon',
  },

  runtimeConfig: {
    token: `${global._token}`,
    public: {
      baseURL: process.env.BASE_URL,
    },
  },

  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },

  build: {
    transpile: ['vuetify'],
  },

})
