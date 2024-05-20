<script setup lang="ts">
const route = useRoute()
const {$notion} = useNuxtApp();
const articleSlug = route.params.slug;


const article = getArticles().find(article => article.link === articleSlug)!;

if (!article) {
  throw createError ({
    statusCode: 404
  })
}

const {data: blockMap} = useAsyncData(article.link, () =>
    $notion.getPageBlocks(article.id)
);

onMounted(() => {
  // For all images, open it in a new tab on click

  const images = document.querySelectorAll('.notion-image-inset');

  images.forEach(image => {
    image.addEventListener('click', () => {
      window.open(image.getAttribute('src')!, '_blank');
    });
  });
})

useHead({
  title: article.title + ' - MNL',
  meta: [
    {
      name: 'description',
      content: "Un article du MNL, premier syndicat lycéen écologiste, antiraciste, antifasciste et révolutionnaire !"
    },
    {name: 'og:title', content: article.title},
    {
      name: 'og:description',
      content: "Un article du MNL, premier syndicat lycéen écologiste, antiraciste, antifasciste et révolutionnaire !"
    },
    {name: 'og:image', content: article.image},
    {name: 'og:time', content: article.date},
  ],
});
</script>

<template>
  <top-bar current-tab="/articles"/>
  <section id="article">
    <h1>
      <Icon name="ph:newspaper-clipping-bold"/>
      {{ article.title }}
    </h1>

    <NotionRenderer
        :blockMap="blockMap"
    />
  </section>
</template>

<style lang="scss">
@import 'static/scss/base.scss';

section#article {
  padding: 50px 25vw;
  gap: 10px;

  h1 {
    font-size: 64px;
    font-weight: 1000;
    line-height: 1.3;
  }
}

@media (max-width: 768px) {
  section#article {
    padding: 30px 7.5vw;

    h1 {
      font-size: 42px;
      margin-bottom: 0;
    }

    .notion-h1 {
      font-size: 28px;
      margin: 10px 0;
    }

    p, li {
      font-size: 18px;
      margin: 10px 0;
    }

    li, ol {
      margin-left: 20px;
    }

    figure {
      width: 100%;
      margin: 15px 0;
      padding: 10px;
    }
  }
}
</style>