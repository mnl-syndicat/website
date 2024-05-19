<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const userData = ref({
  first_name: '',
  last_name: '',
  phone_number: '',
  school: '',
  date_of_birth: '',
  scopes: [{name: ''}]
})
const date_of_birth_string = ref('')

const supabaseMembershipData = await supabase.from('memberships').select(`
    id,
    date_of_birth,
    first_name,
    last_name,
    phone_number,
    school,
    scopes (id, name)
  `).eq('id', user.value!.id)
if (supabaseMembershipData.error) {
  console.error(supabaseMembershipData.error)
} else {
  userData.value = supabaseMembershipData.data[0]
  const date_of_birth_date = new Date(userData.value.date_of_birth)
  const date_of_birth_updated = date_of_birth_date.setDate(date_of_birth_date.getDate() + 1);
  date_of_birth_string.value = new Date(date_of_birth_updated).toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const logout = async () => {
  await supabase.auth.signOut()
  navigateTo('/')
}

useHead({
  title: 'Mon profil — MNL',
  meta: [
    {name: 'description', content: 'Profil de l\'utilisateur sur le site du Mouvement National Lycéen'},
    {name: 'og:title', content: 'Mon profil — Mouvement National Lycéen'},
    {name: 'og:description', content: 'Profil de l\'utilisateur sur le site du Mouvement National Lycéen'},
  ],
})
</script>

<template>
  <section>
    <top-bar current-tab="/interne/profile" :internal="true"/>

    <h1>MON PROFIL</h1>


    <ul>
      <li>
        <Icon name="ph:user-bold" />
        <strong>Pseudo:</strong> {{ user?.user_metadata.pseudo }}
      </li>
      <li>
        <Icon name="ph:identification-card-bold" />
        <strong>Nom complet:</strong> {{ userData.first_name }} {{ userData.last_name }}
      </li>
      <li>
        <Icon name="ph:calendar-bold" />
        <strong>Date de naissance:</strong> {{ date_of_birth_string }}
      </li>
      <li>
        <Icon name="ph:envelope-simple-bold" />
        <strong>Email:</strong> {{ user?.email }}
      </li>
      <li>
        <Icon name="ph:phone-bold" />
        <strong>Téléphone:</strong> {{ userData.phone_number }}
      </li>
      <li>
        <Icon name="ph:graduation-cap-bold" />
        <strong>École:</strong> {{ userData.school }}
      </li>
      <li>
        <Icon name="ph:map-pin-bold" />
        <strong>Fédération:</strong> {{ userData.scopes[0].name }}
      </li>
    </ul>

    <btn label="Modifier mon profil" icon="ph:pencil-simple-bold" href="/interne/profile/edit"/>
    <btn label="Déconnexion" icon="ph:sign-out-bold" @click="logout" weight="secondary"/>
  </section>
</template>

<style scoped lang="scss">
ul {
  font-size: 22px;
  list-style: none;
  display: flex;
  gap: 10px;
  flex-direction: column;

  li {
    display: flex;
    gap: 5px;
    align-items: center;
  }
}
</style>