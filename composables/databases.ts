import strings from '~/static/strings.json';
import values from '~/static/values.json';
import statistics from '~/static/statistics.json';
import articles from '~/static/articles.json';
import partners from '~/static/partners.json';
import socials from '~/static/socials.json';
import missions from '~/static/missions.json';
import materiel from '~/static/materiel.json';
import federations from '~/static/federations.json';
import communiques from '~/static/communiques.json';
import en_members from '~/static/en_members.json';
import contacts from '~/static/contacts.json';
import {SupabaseClient} from "@supabase/supabase-js";

const findPage = (id: string) => strings.find(
    string => string.properties.ID.rich_text[0]?.plain_text === id
) || null;

export const getString = (id: string) => {
    const page = findPage(id);
    return page?.properties.Contenu.rich_text[0]?.plain_text || "String not found";
};

export const getImage = (id: string) => {
    const page = findPage(id);
    return page?.properties.Image.files[0]?.file.url || "Image not found";
};

const processEntries = (entries: any[], fields: [string, string][]) =>
    entries
        .filter(entry => fields.every(([jsonField]) => entry.properties[jsonField]?.[entry.properties[jsonField].type]?.length > 0))
        .map(entry => fields.reduce((acc, [jsonField, exportName]) => {
            acc[exportName] = entry.properties[jsonField][entry.properties[jsonField].type][0].plain_text;
            return acc;
        }, {} as Record<string, string>));

export const getValues = () => processEntries(values, [
    ['ID', 'title'],
    ['Description', 'description'],
    ['Icone', 'icon']
]);

const generateDynamicData = async (supabase: SupabaseClient) => ({
    federationCount: String(federations.filter(federation => federation.properties.Active.checkbox).length),
    memberCount: (await supabase.rpc('count_current_memberships')).data,
});

export const getStatistics = async () => {
    const supabase = useSupabaseClient()

    const dynamicData = await generateDynamicData(supabase);
    return statistics
        .filter(stat => stat.properties.ID.title.length > 0 && stat.properties.Valeur.rich_text.length > 0 && stat.properties.Icone.rich_text.length > 0)
        .map(stat => ({
            title: stat.properties.ID.title[0].plain_text,
            value: stat.properties.Valeur.rich_text[0].plain_text.startsWith("dynamic:")
                // @ts-ignore - can not make it type safe as it is dynamic
                ? dynamicData[stat.properties.Valeur.rich_text[0].plain_text.split(":")[1]] || "Error"
                : stat.properties.Valeur.rich_text[0].plain_text,
            icon: stat.properties.Icone.rich_text[0].plain_text,
            live: stat.properties.Valeur.rich_text[0].plain_text.startsWith("dynamic:"),
        }));
};

export const getArticles = () => {
    return articles
        .filter(article => article.properties.Publie.checkbox && article.properties.ID.title.length > 0 && article.properties.Image.files.length > 0 && article.properties.Lien.rich_text.length > 0 && article.properties.Date.date.start)
        .sort((a, b) => new Date(b.properties.Date.date.start).getTime() - new Date(a.properties.Date.date.start).getTime())
        .map(article => ({
            title: article.properties.ID.title[0].plain_text,
            image: article.properties.Image.files[0].file.url,
            link: article.properties.Lien.rich_text[0].plain_text,
            date: article.properties.Date.date.start,
            category: article.properties.Categorie.select.name,
            id: article.id,
        }));
};

export const getArticlesCategories = () => [...new Set(getArticles().map(article => article.category))].sort((a, b) => a.localeCompare(b));

export const getPartners = () => {
    return partners
        .filter(partner => partner.properties.ID.title.length > 0 && partner.properties.Image.files.length > 0 && partner.properties.Link.url)
        .map(partner => ({
            name: partner.properties.ID.title[0].plain_text,
            icon: partner.properties.Image.files[0].file.url,
            link: partner.properties.Link.url,
        }));
};

export const getSocials = () => processEntries(socials, [
    ['ID', 'name'],
    ['Icone', 'icon'],
    ['Link', 'link']
]);

export const getMissions = () => processEntries(missions, [
    ['ID', 'title'],
    ['Description', 'description']
]);

export const getMateriel = () => {
    return materiel
        .filter(item => item.properties.ID.title.length > 0 && item.properties.Image.files.length > 0 && item.properties.File.files.length > 0)
        .map(item => ({
            title: item.properties.ID.title[0].plain_text,
            image: item.properties.Image.files[0].file.url,
            file: `https://www.notion.so/signed/${encodeURIComponent(item.properties.File.files[0].file.url.replace(/\?.*$/, ''))}?table=block&id=${item.id.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5')}`,
        }));
};

export const getFederations = () => {
    return federations
        .map(federation => ({
            name: federation.properties.Departement.title[0].plain_text,
            code: federation.properties.Code.rich_text[0].plain_text,
            email: federation.properties.Email.email,
            active: federation.properties.Active.checkbox,
            instagram: federation.properties.Instagram.url,
            notionId: federation.id,
        }))
        .sort((a, b) => a.code.localeCompare(b.code));
};

export const getCommuniques = () => {
    return communiques
        .filter(communique => communique.properties.Publie.checkbox && communique.properties.ID.title.length > 0 && communique.properties.Image.files.length > 0 && communique.properties.Lien.rich_text.length > 0 && communique.properties.Date.date && communique.properties.Date.date.start)
        .map(communique => ({
            title: communique.properties.ID.title[0].plain_text,
            image: communique.properties.Image.files[0].file.url,
            link: communique.properties.Lien.rich_text[0].plain_text,
            // @ts-ignore - date is always defined as it is in the filter
            date: communique.properties.Date.date.start,
            file: communique.properties.File.files.length > 0
                ? `https://www.notion.so/signed/${encodeURIComponent(communique.properties.File.files[0].file.url.replace(/\?.*$/, ''))}?table=block&id=${communique.id.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5')}`
                : '',
            id: communique.id,
        }))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getEnMembers = () => {
    return en_members
        .filter(member => member.properties.Nom.title.length > 0 && member.properties.Image.files.length > 0 && member.properties.Fonction.rich_text.length > 0)
        .map(member => ({
            name: member.properties.Nom.title[0].plain_text,
            image: member.properties.Image.files[0].file.url,
            role: member.properties.Fonction.rich_text[0].plain_text,
            email: member.properties.Email.email,
            phone: member.properties.Telephone.phone_number,
            instagram: member.properties.Instagram.url,
        }))
        .reverse();
};

export const getContacts = () => {
    return contacts
        .filter(contact => contact.properties.ID.title.length > 0 && contact.properties.Icone.rich_text.length > 0 && contact.properties.Email.email)
        .map(contact => ({
            name: contact.properties.ID.title[0].plain_text,
            icon: contact.properties.Icone.rich_text[0].plain_text,
            email: contact.properties.Email.email,
            id: contact.id,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
};
