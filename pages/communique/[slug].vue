<script setup lang="ts">
const route = useRoute()
const {$notion} = useNuxtApp();
const communiqueSlug = route.params.slug;

const communique = getCommuniques().find(communique => communique.link === communiqueSlug);
console.log(communique)

const {data: blockMap} = useAsyncData(communique.link, () =>
    $notion.getPageBlocks(communique.id)
);

</script>

<template>
  <top-bar current-tab="/communiques" />
  <section id="article">
    <h1><Icon name="mdi:megaphone" /> {{ communique.title }}</h1>

    <btn icon="mdi:download" :label="'Télécharger le communiqué'" :href="communique.file" v-if="communique.file" />

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

  .notion-callout {
    padding: 20px;
    border-radius: 3px;
    background: var(--surface-background-color);
    @include main-border;
    margin: 15px 0;
    display: flex;
    gap: 10px;
    font-size: 16px;
    font-weight: 600;
  }

  .notion-toggle {
    padding: 20px;
    border-radius: 3px;
    background: var(--surface-background-color);
    @include main-border;
    margin: 15px 0;
    display: flex;
    gap: 10px;

    div * {
      font-size: 18px;
    }

    summary {
      font-size: 20px;
      font-weight: 500;
    }
  }

  .notion-h1 {
    font-size: 36px;
    font-weight: 900;
    margin: 30px 0;
  }

  .notion-h2 {
    font-size: 28px;
    font-weight: 800;
    margin: 30px 0;
  }

  p, li {
    font-size: 20px;
    line-height: 1.5;
    margin: 10px 0;
  }

  li, ol {
    margin-left: 20px;
    word-break: break-word;
  }

  figure {
    width: 50%;
    margin: 15px 0 15px 25%;
    border-radius: 3px;
    border: 1px solid #000;
    padding: 10px;
    background: var(--surface-background-color);
    cursor: pointer;

    img {
      width: 100%;
      border-radius: 3px;
    }

    figcaption {
      margin-top: 10px;
    }
  }


  .notion-asset-wrapper div {
    padding-bottom: 0 !important;
  }

  a:not(.btn) {
    color: var(--main-cta-color);
    text-decoration: underline;
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