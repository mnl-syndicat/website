// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        'nuxt-icon',
        'nuxt-svgo',
        '@nuxtjs/google-fonts',
        "@nuxt/image",
        "@nuxtjs/sitemap",
        "@nuxtjs/supabase"
    ],

    supabase: {
        redirectOptions: {
            include: ['/interne(/*)?'],
            login: '/auth/login',
        },
    },

    extends: [
        'nuxt-umami'
    ],

    appConfig: {
      umami: {
          host: "https://analytics.mnl-syndicat.fr",
          id: "6aef2e5f-372b-4ec1-a4f4-dea20bf083af",
          ignoreLocalhost: true,
      }
    },

    css: [
        '@/node_modules/normalize.css/normalize.css',
        '@/static/scss/base.scss',
    ],

    build: {
        transpile: ['vue-notion'],
    },

    googleFonts: {
        families: {
            'Schibsted Grotesk': [400, 500, 600, 700, 800, 900],
        }
    },

    svgo: {
        svgoConfig: {
            plugins: [
                {
                    name: "prefixIds",
                    params: {
                        prefixIds: false,
                        prefixClassNames: false
                    }
                },
            ]
        },
    },

    runtimeConfig: {
        public: {
            COMMIT_SHA: process.env.NUXT_ENV_VERCEL_GIT_COMMIT_SHA || process.env.NUXT_ENV_CURRENT_GIT_SHA || 'latest',
        }
    }
})