<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const modalMessage = ref('')
const modalType = ref('')
const openModal = ref(false)
const loading = ref(false)

const register = async () => {
  loading.value = true

  if ( !email.value || !password.value) {
    modalMessage.value = "Veuillez remplir tous les champs."
    modalType.value = "error"
    openModal.value = true
    loading.value = false
    return
  }

  if (password.value.length < 8) {
    modalMessage.value = "Le mot de passe doit contenir au moins 8 caractères."
    modalType.value = "error"
    openModal.value = true
    loading.value = false
    return
  }

  if (password.value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")) {
    modalMessage.value = "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial, et doit contenir au moins 8 caractères."
    modalType.value = "error"
    openModal.value = true
    loading.value = false
    return
  }

  if (email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) === null) {
    modalMessage.value = "Veuillez entrer une adresse email valide."
    modalType.value = "error"
    openModal.value = true
    loading.value = false
    return
  }

  const {error} = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  loading.value = false
  if (error) {
    modalMessage.value = error.message
    modalType.value = "error"
    openModal.value = true
  } else {
    navigateTo('/interne')
  }
}

</script>

<template>
  <top-bar/>
  <section>
    <h1>Se connecter</h1>
    <div class="authForm">
      <modal v-if="openModal" :type="modalType" :message="modalMessage" @close="openModal = false" />

      <label for="email">
        <Icon name="ph:envelope-simple-bold"/>
        Email</label>
      <input v-model="email" type="email"/>
      <label for="passwordConfirmation">
        <Icon name="ph:lock-bold"/>
        Mot de passe</label>
      <div class="input-with-icon">
        <input v-model="password" :type="showPassword ? 'text' : 'password'"/>
        <Icon :name="showPassword ? 'ph:eye-slash-bold' : 'ph:eye-bold'" @click="showPassword = !showPassword"/>
      </div>

      <a href="/auth/reset-password">Mot de passe oublié ?</a>

      <btn @click="register" label="Connexion" icon="ph:sign-in-bold" v-if="!loading"/>
      <btn label="Chargement..." icon="ph:hourglass-bold" v-if="loading"/>
      <btn label="Créer un compte" icon="ph:plus-bold" href="/auth/register" weight="secondary"/>
    </div>
  </section>
</template>
