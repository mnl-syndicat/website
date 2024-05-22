<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const modalMessage = ref('')
const modalType = ref<'error' | 'information'>('error')
const openModal = ref(false)

const resetPassword = async () => {
  if (!email.value) {
    modalMessage.value = "Veuillez entrer votre adresse email."
    modalType.value = "error"
    openModal.value = true
    return
  }

  const {error} = await supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: `${window.location.origin}/auth/new-password`,
  })


  if (error) {
    modalMessage.value = error.message
    modalType.value = "error"
    openModal.value = true
  } else {
    modalMessage.value = "Un email de réinitialisation de mot de passe vous a été envoyé."
    modalType.value = "information"
    openModal.value = true
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
  <section>
    <top-bar />
    <h1>RÉINITIALISATION DE MOT DE PASSE</h1>

    <div class="authForm">
      <modal v-if="openModal" :type="modalType" :message="modalMessage" @close="openModal = false" />

      <label for="email">
        <Icon name="ph:envelope-simple-bold"/>
        Email</label>
      <input v-model="email" type="email" />
      <btn label="Réinitialiser" icon="ph:lock-bold" @click="resetPassword" />
    </div>
  </section>
</template>

<style scoped lang="scss">

</style>