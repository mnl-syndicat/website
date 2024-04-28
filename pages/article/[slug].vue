<script setup lang="ts">
const route = useRoute()
const {$notion} = useNuxtApp();
const articleSlug = route.params.slug;

const article = getArticles().find(article => article.link === articleSlug);

const {data: blockMap} = useAsyncData(article.link, () =>
    $notion.getPageBlocks(article.id)
);

</script>

<template>
  <section id="article">
    <h1>{{ article.title }}</h1>

    <NotionRenderer
        :blockMap="blockMap"
    />
  </section>
</template>

<style lang="scss">
section#article {
  padding: 50px 25vw;
  gap: 10px;
  h1 {
    font-size: 64px;
    font-weight: 1000;
    line-height: 1.3;
  }

  .notion-h1 {
    font-size: 36px;
    font-weight: 900;
    margin: 30px 0;
  }

  p, li {
    font-size: 20px;
    line-height: 1.5;
    margin: 10px 0;
  }

  li, ol {
    margin-left: 20px;
    word-break: break-all;
  }

  img {
    width: 50%;
    margin: 15px 0 15px 25%;
    border-radius: 3px;
    border: 1px solid #000;
  }

  .notion-asset-wrapper div {
    padding-bottom: 0 !important;
  }

  a {
    color: var(--main-cta-color);
    text-decoration: underline;
  }
}

@media (max-width: 768px) {
  section#article {
    h1 {
      font-size: 42px;
      margin-bottom: 20px;
    }

    .notion-h1 {
      font-size: 28px;
      margin: 20px 0;
    }

    p, li {
      font-size: 18px;
      margin: 10px 0;
    }

    li, ol {
      margin-left: 20px;
    }

    img {
      width: 100%;
      margin: 15px 0;
    }
  }
}
</style>