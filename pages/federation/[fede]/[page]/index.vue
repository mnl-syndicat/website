<script setup lang="ts">
const route = useRoute()
const {$notion} = useNuxtApp();
const fedeCode = route.params.fede;
const pageId = route.params.page;
const federation = getFederations().find(federation => federation.code === fedeCode)!;
const title = ref('');

const {data: blockMap} = useAsyncData(federation.notionId, () =>
    $notion.getPageBlocks(pageId)
);


onMounted(() => {
  const links = document.querySelectorAll('.notion-page-link');
  links.forEach(link => {
    link.setAttribute('href', '/federation/' + fedeCode + link.getAttribute('href'));
  });

  console.log(

  title.value = Object.values(toRaw(blockMap.value) as Object)[0].value.properties.title[0][0]);

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
  <top-bar current-tab="/federations" />
  <section id="federation">
    <h1 class="breadcrumb">
      <router-link :to="'/federation/' + federation.code">
        <Icon name="ph:house-bold"/>
        MNL {{ federation.code }}
      </router-link>
      /
      <span>
        <Icon name="ph:file-text-bold"/>
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