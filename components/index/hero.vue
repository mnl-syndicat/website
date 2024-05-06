<template>
  <section>
    <NuxtImg :src="getImage('orgIllusImage')" width="1920" quality="50" loading="lazy" preload alt="Organization Image" id="heroImg" />
    <h1>{{ getString("orgName") }}</h1>
    <h2>{{ getString("orgDesc") }}</h2>
  </section>
</template>

<script setup>
onMounted(() => {
  const heroImg = document.getElementById('heroImg');

  heroImg.style.height = `${heroImg.parentElement.clientHeight}px`;
});
</script>

<style scoped lang="scss">
section {
  position: relative;
  padding: 10vh 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  color: #FFF;
  background: var(--darker-cta-color)
}

img {
  width: 100%;
  object-fit: cover;
  position: absolute;
  z-index: 0;
}

h1 {
  font-size: 114px;
  font-weight: 1000;
  margin: 0 0 30px;
  z-index: 1;
}

h2 {
  font-weight: 900;
  z-index: 1;
}

@media (max-width: 768px) {
  section {
    padding: 5vh 5vh;
  }

  h1 {
    font-size: 42px;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 28px;
  }
}
</style>