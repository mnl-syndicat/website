<script setup lang="ts">
const supabase = useSupabaseClient()
const password = ref('')
const showPassword = ref(false)
const modalMessage = ref('')
const modalType = ref<'error' | 'information'>('error')
const openModal = ref(false)

const resetPassword = async () => {
  if (!password.value) {
    modalMessage.value = "Veuillez entrer un nouveau mot de passe."
    modalType.value = "error"
    openModal.value = true
    return
  }

  const {error} = await supabase.auth.updateUser({
    password: password.value
  })

  await supabase.auth.signOut()

  if (error) {
    modalMessage.value = error.message
    modalType.value = "error"
    openModal.value = true
  } else {
    navigateTo('/auth/login')
  }
}

useHead({
  title: 'Réinitialisation de mot de passe — MNL',
  meta: [
    {name: 'description', content: 'Réinitialisation de mot de passe sur le site du Mouvement National Lycéen'},
    {name: 'og:title', content: 'Réinitialisation de mot de passe — Mouvement National Lycéen'},
    {name: 'og:description', content: 'Réinitialisation de mot de passe sur le site du Mouvement National Lycéen'},
  ],
})
</script>

<template>
  <top-bar />
  <section>
    <h1>RÉINITIALISATION DE MOT DE PASSE</h1>

    <div class="authForm">
      <modal v-if="openModal" :type="modalType" :message="modalMessage" @close="openModal = false" />

      <label for="password">
        <Icon name="ph:lock-bold"/>
        Nouveau mot de passe</label>
      <div class="input-with-icon">
        <input v-model="password" :type="showPassword ? 'text' : 'password'"/>
        <Icon :name="showPassword ? 'ph:eye-slash-bold' : 'ph:eye-bold'" @click="showPassword = !showPassword"/>
      </div>
      <btn label="Valider" icon="ph:lock-bold" @click="resetPassword" />
    </div>
  </section>
</template>

<style scoped lang="scss">

</style>