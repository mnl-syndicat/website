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
  padding: 10vh 5vw;
  gap: 0;
  flex-direction: column;
  color: #FFF;

  h1 {
    font-size: 6vw;
    font-weight: 1000;
    margin-bottom: 30px;
    max-width: 1500px;
  }

  h2 {
    font-weight: 900;
    font-size: 2.5vw;
    max-width: 1500px;
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