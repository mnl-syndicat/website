<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const pseudo = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const modalMessage = ref('')
const modalType = ref('')
const openModal = ref(false)
const loading = ref(false)
const emailOtp = ref('')
const verificationPending = ref(false)

const register = async () => {
  loading.value = true

  if (!pseudo.value || !email.value || !password.value) {
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

  const {error} = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {data: {pseudo: pseudo.value}}
  })

  loading.value = false
  if (error) {
    modalMessage.value = error.message
    modalType.value = "error"
    openModal.value = true
  } else {
    modalMessage.value = "Un email de vérification vous a été envoyé. Veuillez le confirmer pour continuer."
    modalType.value = "information"
    openModal.value = true
    verificationPending.value = true
    loading.value = false
  }
}

const confirmEmail = async () => {
  const {error} = await supabase.auth.verifyOtp({
    email: email.value,
    token: emailOtp.value,
    type: "email"
  })

  navigateTo("/interne")
}
</script>

<template>
  <top-bar/>
  <section>
    <h1>Créer votre compte</h1>
    <div class="authForm">
      <modal v-if="openModal" :type="modalType" :message="modalMessage" @close="openModal = false" />

      <label for="pseudo" >
        <Icon name="ph:user-bold"/>
        Pseudo</label>
      <input v-model="pseudo" type="text" :disabled="verificationPending"/>
      <label for="email">
        <Icon name="ph:envelope-simple-bold"/>
        Email</label>
      <input v-model="email" type="email" :disabled="verificationPending"/>
      <label for="passwordConfirmation">
        <Icon name="ph:lock-bold"/>
        Mot de passe</label>
      <div class="input-with-icon">
        <input v-model="password" :type="showPassword ? 'text' : 'password'" :disabled="verificationPending"/>
        <Icon :name="showPassword ? 'ph:eye-slash-bold' : 'ph:eye-bold'" @click="showPassword = !showPassword"/>
      </div>

      <label for="otp" v-if="verificationPending">
        <Icon name="ph:key-bold"/>
        Code de vérification</label>
      <input v-model="emailOtp" type="text" v-if="verificationPending"/>
      <btn @click="confirmEmail" label="Confirmer l'email" icon="ph:check-bold" v-if="verificationPending && !loading"/>
      <btn @click="register" label="Créer mon compte" icon="ph:sign-in-bold" v-if="!verificationPending && !loading"/>
      <btn label="Chargement..." icon="ph:hourglass-bold" v-if="loading"/>
    </div>
  </section>
</template>
