<script setup lang="ts">
import {getTools} from "~/composables/databases";

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const isEnMember = ref(false)
const enLinks = ref([{
  label: '',
  icon: '',
  path: '',
  description: '',
}])

let links = getTools().filter(tool => tool.en_only === false)

const {data, error} = await supabase.from('memberships').select(`
    scopes (id, name)
  `).eq('id', user.value!.id)

const scopes = data![0].scopes
// @ts-ignore
isEnMember.value = scopes.some((scope: { id: string; name: string }) => scope.name === 'Équipe Nationale')

if (error) {
  console.error(error)
} else if (isEnMember) {
  enLinks.value = getTools().filter(tool => tool.en_only === true)
}

useHead(
    {
      title: 'Espace adhérent — MNL',
      meta: [
        {name: 'description', content: 'Accédez à toutes les fonctionnalités de votre espace adhérent'},
        {name: 'og:title', content: 'Espace adhérent — Mouvement National Lycéen'},
        {name: 'og:description', content: 'Accédez à toutes les fonctionnalités de votre espace adhérent'},
      ],
    }
);
</script>

<template>
  <top-bar current-tab="/interne" :internal="true"/>
  <section class="materiel">
    <h1>Bienvenue, {{ user?.user_metadata.pseudo }} !</h1>
    <p>
      Accédez ci-dessous à toutes les fonctionnalités de votre espace adhérent :
    </p>

    <div class="card-grid">
      <nuxt-link class="card" v-for="link in links" :to="link.path" :key="link.path">
        <h3>
          <Icon :name="link.icon"/>
          {{ link.label }}
        </h3>
        <p>{{ link.description }}</p>
      </nuxt-link>
    </div>

    <h2 v-if="isEnMember">Outils de l'équipe nationale</h2>
    <div class="card-grid">
      <nuxt-link class="card" v-for="link in enLinks" :to="link.path" :key="link.path">
        <h3>
          <Icon :name="link.icon"/>
          {{ link.label }}
        </h3>
        <p>{{ link.description }}</p>
      </nuxt-link>
    </div>
  </section>
</template>

<style scoped lang="scss">
.card-grid {
  gap: 15px;
  width: calc(275px * 3 + 15px * 3);
}

.card {
  width: 275px;

  p {
    font-size: 16px;
  }

  h3 {
    font-size: 22px;
  }
}

h2 {
  font-size: 32px;
}

@media (max-width: 768px) {
  .card-grid {
    gap: 10px;
    width: 100%;

    .btn {
      width: 100%;
    }
  }
}
</style>