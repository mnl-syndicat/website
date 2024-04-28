<template>
  <section>
    <h2>CONTACT</h2>
    <p>
      <Icon name="mdi:email" /> Mail : <a :href="'mailto:' + getString('orgEmail')">{{ getString('orgEmail') }}</a> <br>
      <Icon name="mdi:phone" /> Téléphone : <a :href="'tel:' + getString('orgPhone')">{{ getString('orgPhone') }}</a> <br>
      <Icon name="mdi:mail" /> Adresse : {{ getString('orgAddress') }}
    </p>
  </section>
  <socials/>
</template>

<style scoped lang="scss">
section {
  width: 100vw;
  display: flex;
  padding: 50px 15vw;
  flex-direction: column;
  gap: 50px;

  h2 {
    text-align: center;
  }

  p {
    font-size: 25px;
    font-weight: 600;
    line-height: 1.8;

    a {
      color: var(--main-cta-color);
      font-weight: 800;
    }

    svg {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
}
</style>