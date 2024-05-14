<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const userData = ref({})
const federations = ref([])

onMounted(async () => {
  const {data, error} = await supabase.from('memberships').select(`
    id,
    date_of_birth,
    first_name,
    last_name,
    phone_number,
    school,
    scopes (id, name)
  `).eq('id', user.value?.id)
  if (error) {
    console.error(error)
  } else {
    userData.value = data[0]
  }

  const federationsSupabaseData = await supabase.from('scopes').select(`
    id,
    name
  `).eq('type', "Département")

  federations.value = federationsSupabaseData.data?.sort((a, b) => a.name.localeCompare(b.name))
});

const saveProfile = async () => {
  const newFederationId = federations.value.find(federation => federation.name === userData.value.scopes[0].name).id

  const {data, error} = await supabase
      .from('memberships')
      .update({
        first_name: userData.value.first_name,
        last_name: userData.value.last_name,
        date_of_birth: userData.value.date_of_birth,
        phone_number: userData.value.phone_number,
        school: userData.value.school,
      })
      .eq('id', user.value?.id)

  const {data: scopesData, error: scopesError} = await supabase
      .from('users_scopes')
      .update({
        scope_id: newFederationId
      })
      .eq('user_id', user.value?.id).eq('scope_id', userData.value.scopes[0].id)

  if (error) {
    console.error(error)
  } else {
    navigateTo('/interne/profile')
  }
}
</script>

<template>
  <section>
    <top-bar current-tab="/interne/profile" :internal="true"/>

    <h1>MON PROFIL</h1>

    <div class="authForm">
      <label for="first_name"><Icon name="ph:identification-card-bold" /> Prénom:</label>
      <input type="text" id="first_name" v-model="userData.first_name">
      <label for="last_name"><Icon name="ph:identification-card-bold" /> Nom:</label>
      <input type="text" id="last_name" v-model="userData.last_name">
      <label for="date_of_birth"><Icon name="ph:calendar-bold" /> Date de naissance:</label>
      <input type="date" id="date_of_birth" v-model="userData.date_of_birth">
      <label for="phone_number"><Icon name="ph:phone-bold" /> Téléphone:</label>
      <input type="tel" id="phone_number" v-model="userData.phone_number">
      <label for="school"><Icon name="ph:graduation-cap-bold" /> École:</label>
      <input type="text" id="school" v-model="userData.school">
      <label for="federation"><Icon name="ph:map-pin-bold"/> Fédération :</label>
      <select id="federation" v-if="userData.scopes && userData.scopes.length > 0" v-model="userData.scopes[0].name">
        <option v-for="federation in federations" :key="federation.id" :value="federation.name">{{ federation.name }}</option>
      </select>

      <btn label="Sauvegarder" icon="ph:floppy-disk-bold" @click="saveProfile"/>
    </div>
  </section>
</template>

<style scoped lang="scss">
p {
  font-size: 22px;
}
</style>