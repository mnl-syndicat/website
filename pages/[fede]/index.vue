<script setup lang="ts">
const route = useRoute()
const {$notion} = useNuxtApp();
const fedeCode = route.params.fede;
const federation = getFederations().find(federation => federation.code === fedeCode);

const {data: blockMap} = useAsyncData(federation.notionId, () =>
    $notion.getPageBlocks(federation.notionId)
);

useHead({
  title: `MNL ${federation.code} (${federation.name})`,
  meta: [
    { name: 'description', content: `Espace de la fédération ${federation.name} du MNL` },
  ],
});
</script>

<template>
  <section id="federation">
    <h1>MNL {{ federation.code }} ({{ federation.name }})</h1>
    <div class="contact-button-list">
      <btn :href="'mailto:' + federation.email" icon="mdi:email" :label="federation.email" />
      <btn v-if="federation.instagram" :href="federation.instagram" icon="mdi:instagram" :label="'@' + federation.instagram.match(/^https?:\/\/(?:www\.)?instagram\.com\/([^/?]+)/i)?.[1] || 'Instagram'" />
    </div>

    <p class="disclaimer">
      L'espace ci-dessous est entièrement géré par la fédération {{ federation.name }} du MNL. <br> Les propos tenus ici n'engagent que le MNL {{ federation.code }}.
    </p>

    <NotionRenderer
        :blockMap="blockMap"
        :mapPageUrl="pageId => '/' + fedeCode + '/' + pageId"
    />
  </section>
</template>

<style lang="scss">
@import 'static/scss/base.scss';

#federation {
  gap: 20px;
  .contact-button-list {
    display: flex;
    gap: 20px;
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
    align-items: start;
  }

  #federation .notion {
    padding: 0;
  }

  #federation .contact-button-list {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
}
</style>