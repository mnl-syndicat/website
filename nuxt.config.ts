export default defineNuxtConfig({
    modules: [
        'nuxt-icon',
        'nuxt-svgo',
        '@nuxtjs/google-fonts',
        "@nuxt/image",
        "@nuxtjs/sitemap",
        "@nuxtjs/supabase",
        '@nuxtjs/robots',
    ],

    supabase: {
        redirectOptions: {
            include: ['/interne(/*)?'],
            login: '/auth/login',
            callback: '/interne',
        },
    },

    robots: {
      rules: {
          UserAgent: '*',
          Disallow: ['/interne', '/auth/new-password', '/auth/reset-password'],
      }
    },

    typescript: {
        typeCheck: true,
    },

    extends: [
        'nuxt-umami'
    ],

    appConfig: {
      umami: {
          host: "https://analytics.mnl-syndicat.fr",
          id: "6aef2e5f-372b-4ec1-a4f4-dea20bf083af",
          ignoreLocalhost: true,
          version: 2
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

    sitemap: {
        sources: [
            '/api/__sitemap__/urls',
        ],
        exclude: ["/interne", "/auth/new-password", "/auth/reset-password", "/interne/*"],
    },

    runtimeConfig: {
        public: {
            COMMIT_SHA: process.env.NUXT_ENV_VERCEL_GIT_COMMIT_SHA || process.env.NUXT_ENV_CURRENT_GIT_SHA || 'latest',
            sentry: {
                dsn: "https://d23dc40e8c2bf00285ebe53583f31abd@o4507288114823168.ingest.de.sentry.io/4507288117968976",
                environment: process.env.NODE_ENV
            }
        }
    },

    routeRules: {
        '/news': {
            redirect: '/articles',
        },
        '/news/le-mnl-integre-lobessu': {
            redirect: '/communique/mnl-integre-obessu',
        },
        '/actualites': {
            redirect: '/articles',
        },
        '/login': {
            redirect: '/auth/login',
        },
        '/register': {
            redirect: '/auth/register',
        },
        '/formation-blocus': {
            redirect: '/article/guide-blocus',
        },
        '/ou-sommes-nous': {
            redirect: '/federations',
        },
        '/lacrymo': {
            redirect: '/article/lacrymo'
        }
    },
})