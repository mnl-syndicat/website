export default defineNuxtConfig({
    modules: [
        'nuxt-icon',
        'nuxt-svgo',
        '@nuxtjs/google-fonts',
        "@nuxt/image",
        "@nuxtjs/sitemap",
        "@nuxtjs/supabase",
        '@nuxtjs/robots',
        '@nuxtjs/sentry',
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

    // @ts-ignore
    sentry: {
        dsn: process.env.SENTRY_SDN,
        config: {
            environment: process.env.NODE_ENV,
            release: process.env.NUXT_ENV_VERCEL_GIT_COMMIT_SHA || process.env.NUXT_ENV_CURRENT_GIT_SHA || 'latest',
        },
        clientIntegrations: {
            Replay: {}
        },
        clientConfig: {
            replaysSessionSampleRate: 0.3,
            replaysOnErrorSampleRate: 1.0,
        },
        publishRelease: {
            authToken: process.env.SENTRY_AUTH_TOKEN,
            org: 'mnl-syndicat',
            project: 'website',
            release: {
                setCommits: {
                    auto: true
                }
            }
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
        }
    },
})