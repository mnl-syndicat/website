<template>
  <section :style="{ backgroundImage: `url(${getImage('orgIllusImage')})` }">
    <h1>{{ getString("orgName") }}</h1>
    <h2>{{ getString("orgDesc") }}</h2>
  </section>
</template>

<style scoped lang="scss">
section {
  background-size: cover;
  background-position: center;
  background-color: var(--main-cta-color);
  padding: 10vh 20vh;
  gap: 0;
  flex-direction: column;
  color: #FFF;

  h1 {
    font-size: 114px;
    font-weight: 1000;
    margin-bottom: 30px;
  }

  h2 {
    font-weight: 900;
  }
}

@media (max-width: 768px) {
  section {
    padding: 5vh 5vh;

    h1 {
      font-size: 42px;
      margin-bottom: 20px;
    }

    h2 {
      font-size: 28px;
    }
  }
}
</style>