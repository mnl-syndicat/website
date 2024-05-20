import * as Sentry from '@sentry/vue'

export default defineNuxtPlugin((nuxtApp) => {
    const router = useRouter()
    const { public: { sentry } } = useRuntimeConfig()

    if (!sentry.dsn) {
        return
    }

    Sentry.init({
        app: nuxtApp.vueApp,
        dsn: sentry.dsn,
        environment: sentry.environment,
        integrations: [
            Sentry.browserTracingIntegration({ router }),
        ],

        tracesSampleRate: 0.2,
        tracePropagationTargets: ['localhost', 'https://mnl-syndicat.fr'],
        replaysSessionSampleRate: 0.3,
        replaysOnErrorSampleRate: 1.0,
    })
})