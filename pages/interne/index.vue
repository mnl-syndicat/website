<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const isEnMember = ref(false)
const enLinks = ref([{
  label: '',
  icon: '',
  path: '',
}])

let links = [
  {
    label: 'Accueil',
    icon: 'ph:house-bold',
    path: '/interne',
  },
  {
    label: 'Profil',
    icon: 'ph:user-bold',
    path: '/interne/profile',
  },
  {
    label: 'Matériel militant',
    icon: 'ph:sticker-bold',
    path: '/interne/materiel',
  },
  {
    label: 'Discussion & Pôles',
    icon: 'ph:chat-circle-bold',
    path: '/interne/channels',
  },
  {
    label: 'Espace fédération',
    icon: 'ph:users-bold',
    path: 'https://interne.mnl-syndicat.fr',
  },
  {
    label: 'Générateur de logos',
    icon: 'ph:square-logo-bold',
    path: '/interne/logo-generator',
  },
  {
    label: 'Générateur d\'image d\'illustration',
    icon: 'ph:paint-brush-bold',
    path: '/interne/visual-generator',
  },
]

const {data, error} = await supabase.from('memberships').select(`
    scopes (id, name)
  `).eq('id', user.value!.id)

const scopes = data![0].scopes
// @ts-ignore
isEnMember.value = scopes.some((scope: { id: string; name: string }) => scope.name === 'Équipe Nationale')

if (error) {
  console.error(error)
} else if (isEnMember) {
  enLinks.value = [
    {
      label: 'Mots de passe',
      icon: 'ph:lock-bold',
      path: 'https://mdp.mnl-syndicat.fr',
    },
    {
     label: 'Campagnes de mails',
      icon: 'ph:envelope-simple-bold',
      path: 'https://sender.net',
    },
  ];
}

useHead(
  {
    title: 'Espace adhérent — MNL',
    meta: [
      { name: 'description', content: 'Accédez à toutes les fonctionnalités de votre espace adhérent' },
      { name: 'og:title', content: 'Espace adhérent — Mouvement National Lycéen' },
      { name: 'og:description', content: 'Accédez à toutes les fonctionnalités de votre espace adhérent' },
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
      <btn :label="link.label" :icon="link.icon" :href="link.path" v-for="link in links.slice(1)" weight="secondary"/>
    </div>

    <h2 v-if="isEnMember">Outils de l'équipe nationale</h2>
    <div class="card-grid">
      <btn :label="link.label" :icon="link.icon" :href="link.path" v-for="link in enLinks" weight="secondary"/>
    </div>
  </section>
</template>

<style scoped lang="scss">
.card-grid {
  justify-content: center;
  gap: 15px;
  width: 700px;
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