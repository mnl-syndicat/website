<script setup lang="ts">
const route = useRoute()
const {$notion} = useNuxtApp();
const communiqueSlug = route.params.slug;

const communique = getCommuniques().find(communique => communique.link === communiqueSlug)!;

const {data: blockMap} = useAsyncData(communique.link, () =>
    $notion.getPageBlocks(communique.id)
);

</script>

<template>
  <top-bar current-tab="/communiques" />
  <section id="article">
    <h1><Icon name="ph:megaphone-simple-bold" /> {{ communique.title }}</h1>

    <btn icon="ph:download-bold" :label="'Télécharger le communiqué'" :href="communique.file" v-if="communique.file" />

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