import strings from '../static/strings.json'
import values from '../static/values.json'
import statistics from '../static/statistics.json'
import articles from '../static/articles.json'
import partners from '../static/partners.json'
import socials from '../static/socials.json'
import missions from '../static/missions.json'
import materiel from '../static/materiel.json'
import federations from '../static/federations.json'
import communiques from '../static/communiques.json'

function findPage(id: string) {
    for (const string of strings) {
        if (string.properties.ID.rich_text.length > 0 && string.properties.ID.rich_text[0].plain_text === id) {
            return string
        }
    }
    return null;
}

export const getString = (id: string) => {
    const page = findPage(id, strings);
    return page && page.properties.Contenu.rich_text.length > 0 ? page.properties.Contenu.rich_text[0].plain_text : "String not found";
}

export const getImage = (id: string) => {
    const page = findPage(id, strings);
    return page && page.properties.Image.files.length > 0 ? page.properties.Image.files[0].file.url : "Image not found";
}

export const getValues = () => {
    let processedValues = [];
    for (const value of values) {
        if (value.properties.ID.title.length > 0 && value.properties.Description.rich_text.length > 0 && value.properties.Image.files.length > 0) {
            processedValues.push({
                title: value.properties.ID.title[0].plain_text,
                description: value.properties.Description.rich_text[0].plain_text,
                icon: value.properties.Image.files[0].file.url
            })
        }
    }

    return processedValues;
}

export const getStatistics = () => {
    let processedStatistics = [];
    for (const statistic of statistics) {
        if (statistic.properties.ID.title.length > 0 && statistic.properties.Valeur.rich_text.length > 0 && statistic.properties.Image.files.length > 0) {
            processedStatistics.push({
                title: statistic.properties.ID.title[0].plain_text,
                value: statistic.properties.Valeur.rich_text[0].plain_text,
                icon: statistic.properties.Image.files[0].file.url
            })
        }
    }

    return processedStatistics;
}

export const getArticles = () => {
    let processedArticles = [];
    articles.sort((a, b) => {
        return new Date(b.properties.Date.date.start).getTime() - new Date(a.properties.Date.date.start).getTime();
    });

    for (const article of articles) {
        if (article.properties.Publie.checkbox === true && article.properties.ID.title.length > 0 && article.properties.Image.files.length > 0 && article.properties.Lien.rich_text.length > 0 && article.properties.Date.date.start) {
            processedArticles.push({
                title: article.properties.ID.title[0].plain_text,
                image: article.properties.Image.files[0].file.url,
                link: article.properties.Lien.rich_text[0].plain_text,
                date: article.properties.Date.date.start,
                category: article.properties.Categorie.select.name,
                id: article.id
            })
        }
    }

    return processedArticles;
}

export const getArticlesCategories = () => {
    let categories = [];
    for (const article of getArticles()) {
        categories.push(article.category);
    }

    categories.sort((a, b) => { return a.localeCompare(b); });

    return [...new Set(categories)];
}

export const getPartners = () => {
    let processedPartners = [];
    for (const partner of partners) {
        if (partner.properties.ID.title.length > 0 && partner.properties.Image.files.length > 0 && partner.properties.Link.url) {
            processedPartners.push({
                name: partner.properties.ID.title[0].plain_text,
                icon: partner.properties.Image.files[0].file.url,
                link: partner.properties.Link.url
            })
        }
    }

    return processedPartners;
}

export const getSocials = () => {
    let processedSocials = [];
    for (const social of socials) {
        if (social.properties.ID.title.length > 0 && social.properties.Image.files.length > 0 && social.properties.Link.url) {
            processedSocials.push({
                name: social.properties.ID.title[0].plain_text,
                icon: social.properties.Image.files[0].file.url,
                link: social.properties.Link.url
            })
        }
    }

    return processedSocials;
}

export const getMissions = () => {
    let processedMissions = [];
    for (const mission of missions) {
        if (mission.properties.ID.title.length > 0 && mission.properties.Description.rich_text.length > 0) {
            processedMissions.push({
                title: mission.properties.ID.title[0].plain_text,
                description: mission.properties.Description.rich_text[0].plain_text,
            })
        }
    }

    return processedMissions;
}

export const getMateriel = () => {
    let processedMateriel = [];
    for (const item of materiel) {
        if (item.properties.ID.title.length > 0 && item.properties.Image.files.length > 0 && item.properties.File.files.length > 0) {
            processedMateriel.push({
                title: item.properties.ID.title[0].plain_text,
                image: item.properties.Image.files[0].file.url,
                file: "https://www.notion.so/signed/" + encodeURIComponent(item.properties.File.files[0].file.url.replace(/\?.*$/, '')) + "?table=block&id=" + item.id.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5'),
            })
        }
    }

    return processedMateriel;
}

export const getFederations = () => {
    let processedFederations = [];

    for (const federation of federations) {
        processedFederations.push({
            name: federation.properties.Departement.title[0].plain_text,
            code: federation.properties.Code.rich_text[0].plain_text,
            email: federation.properties.Email.email,
            active: federation.properties.Active.checkbox,
            instagram: federation.properties.Instagram.url,
            notionId: federation.id
        })
    }

    processedFederations.sort((a, b) => {
        return a.code.localeCompare(b.code);
    });

    return processedFederations;
}

export const getCommuniques = () => {
    let processedCommuniques = [];
    communiques.sort((a, b) => {
        return new Date(b.properties.Date.date.start).getTime() - new Date(a.properties.Date.date.start).getTime();
    });

    for (const communique of communiques) {
        if (communique.properties.Publie.checkbox === true && communique.properties.ID.title.length > 0 && communique.properties.Image.files.length > 0 && communique.properties.Lien.rich_text.length > 0 && communique.properties.Date.date.start) {
            processedCommuniques.push({
                title: communique.properties.ID.title[0].plain_text,
                image: communique.properties.Image.files[0].file.url,
                link: communique.properties.Lien.rich_text[0].plain_text,
                date: communique.properties.Date.date.start,
                file: "https://www.notion.so/signed/" + encodeURIComponent(communique.properties.File.files[0].file.url.replace(/\?.*$/, '')) + "?table=block&id=" + communique.id.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5'),
                id: communique.id
            })
        }
    }

    return processedCommuniques;
}