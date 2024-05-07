<script setup lang="ts">
const route = useRoute()
const {$notion} = useNuxtApp();
const fedeCode = route.params.fede;
const pageId = route.params.page;
const federation = getFederations().find(federation => federation.code === fedeCode);
const title = ref('');

const {data: blockMap} = useAsyncData(federation.notionId, () =>
    $notion.getPageBlocks(pageId)
);


onMounted(() => {
  const links = document.querySelectorAll('.notion-page-link');
  links.forEach(link => {
    link.setAttribute('href', '/' + fedeCode + link.getAttribute('href'));
  });

  title.value = Object.values(Object.values(blockMap)[3])[0].value.properties.title[0][0];

  useHead({
    title: `MNL ${federation.code} — ${title.value}`,
    meta: [
      {name: 'description', content: `Espace de la fédération ${federation.name} du MNL`},
      {name: 'og:title', content: `MNL ${federation.code} — ${title.value}`},
      {name: 'og:description', content: `Espace de la fédération ${federation.name} du MNL`},
    ],
  });
});
</script>

<template>
  <section id="federation">
    <h1 class="breadcrumb">
      <router-link :to="'/' + federation.code">
        <Icon name="mdi:home-outline"/>
        MNL {{ federation.code }}
      </router-link>
      /
      <span>
        <Icon name="material-symbols:description-outline"/>
      {{ title }}
      </span>
    </h1>

    <NotionRenderer
        :blockMap="blockMap"
    />
  </section>
</template>

<style lang="scss">
@import 'static/scss/base.scss';

#federation {
  gap: 20px;

  h1 {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  h1 span, h1 a {
    display: flex;
    align-items: center;
    gap: 20px;

    .icon {
      width: 48px;
      height: 48px;
    }
  }

  h1 a {
    color: var(--main-cta-color);

    .icon path {
      stroke: var(--main-cta-color);
      stroke-width: 0.5px;
      paint-order: stroke;
    }
  }

  .notion {
    padding: 0 10vw;
    margin-top: 30px;

    li, ol {
      margin-left: 20px;
      word-break: break-word;
      margin-top: 5px;
    }

    h1 {
      font-size: 42px;
      font-weight: 900;
      margin: 30px 0;
    }

    h2 {
      font-size: 32px;
      font-weight: 800;
      margin: 30px 0;
    }

    .notion-page-link {
      display: flex;
      gap: 10px;
      font-size: 20px;
      font-weight: 600;
      padding: 15px 20px;
      border-radius: 3px;
      background: var(--surface-background-color);
      @include main-border;
      width: max-content;
      margin: 20px 0;
    }
  }
}

@media (max-width: 768px) {
  #federation {
    .notion {
      padding: 0;
    }

    .breadcrumb {
      flex-wrap: wrap;

      .icon {
        width: 36px;
        height: 36px;
      }
    }
  }
}
</style>