<script setup lang="ts">
const {$notion} = useNuxtApp();

const {data: blockMap} = useAsyncData('4ad9a1a3f40143d7bd3fc489c5d0b2ce', () =>
    $notion.getPageBlocks('4ad9a1a3f40143d7bd3fc489c5d0b2ce')
);

useHead({
    title: 'Discussion & Pôles — MNL',
    meta: [
        {name: 'description', content: 'Canaux de discussion & Pôles du Mouvement National Lycéen'},
        {name: 'og:title', content: 'Discussion & Pôles — Mouvement National Lycéen'},
        {name: 'og:description', content: 'Canaux de discussion & Pôles du Mouvement National Lycéen'},
    ],
});
</script>

<template>
  <top-bar :internal="true"/>
  <section>
    <h1>Discussion & Pôles</h1>
    <NotionRenderer
        :blockMap="blockMap"
    />
  </section>
</template>