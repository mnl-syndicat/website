import { getFederations, getCommuniques, getArticles } from "~/composables/databases";

export default defineSitemapEventHandler(() => {
    const federations = getFederations();
    const federationsSitemapItems = federations.map(federation => ({
        loc: `/federation/${federation.code}`,
        _sitemap: 'federations',
    }));

    const communiques = getCommuniques();
    const communiquesSitemapItems = communiques.map(communique => ({
        loc: `/communique/${communique.link}`,
        _sitemap: 'communiques',
    }));

    const articles = getArticles();
    const articlesSitemapItems = articles.map(article => ({
        loc: `/article/${article.link}`,
        _sitemap: 'articles',
    }));

    return [...federationsSitemapItems, ...communiquesSitemapItems, ...articlesSitemapItems];
})
