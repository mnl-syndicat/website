<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const userData = ref({})

onMounted(async () => {
  const {data, error} = await supabase.from('memberships').select('*').eq('id', user.value?.id)
  if (error) {
    console.error(error)
  } else {
    userData.value = data[0]
    userData.value.date_of_birth_string = new Date(userData.value.date_of_birth).toLocaleString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
    console.log(userData.value)
  }
});

const logout = async () => {
  await supabase.auth.signOut()
  navigateTo('/')
}
</script>

<template>
  <section>
    <top-bar current-tab="/interne/profile" :internal="true" />

    <h1>MON PROFIL</h1>

    <p>
      <Icon name="ph:user-bold" /> <strong>Pseudo:</strong> {{ user?.user_metadata.pseudo }} <br>
      <Icon name="ph:identification-card-bold" /> <strong>Nom complet:</strong> {{ userData.first_name }} {{ userData.last_name }} <br>
      <Icon name="ph:calendar-bold" /> <strong>Date de naissance:</strong> {{ userData.date_of_birth_string }} <br>
      <Icon name="ph:envelope-simple-bold" /> <strong>Email:</strong> {{ user?.email }} <br>
      <Icon name="ph:phone-bold" /> <strong>Téléphone:</strong> {{ userData.phone_number }} <br>
      <Icon name="ph:graduation-cap-bold" /> <strong>École:</strong> {{ userData.school }} <br>
    </p>

    <btn label="Modifier mon profil" icon="ph:pencil-simple-bold" href="/interne/profile/edit" />
    <btn label="Déconnexion" icon="ph:sign-out-bold" @click="logout" weight="secondary" />
  </section>
</template>

<style scoped lang="scss">
p {
  font-size: 22px;
}
</style>