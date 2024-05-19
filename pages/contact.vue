<script setup lang="ts">
useHead({
  title: 'Contact — MNL',
  meta: [
    {name: 'description', content: 'Contacter le Mouvement National Lycéen'},
    {name: 'og:title', content: 'Communiqués — Mouvement National Lycéen'},
    {name: 'og:description', content: 'Contacter le Mouvement National Lycéen'},
  ],
})
</script>

<template>
  <top-bar current-tab="/contact"/>
  <section>
    <h1>CONTACT</h1>
    <div class="contacts">
      <a class="contact" v-for="contact in getContacts()" :key="contact.id" :href="'mailto:' + contact.email">
        <h3>
          <Icon :name="contact.icon"/>
          {{ contact.name }}
        </h3>
        <p>{{ contact.email }}</p>
      </a>
    </div>
    <p>
      <Icon name="ph:envelope-bold"/>
      Email général : <a :href="'mailto:' + getString('orgEmail')">{{ getString('orgEmail') }}</a> <br>
      <Icon name="ph:phone-bold"/>
      Téléphone : <a :href="'tel:' + getString('orgPhone')">{{ getString('orgPhone') }}</a> <br>
      <Icon name="ph:signpost-bold"/>
      Adresse : {{ getString('orgAddress') }}
    </p>
  </section>
  <socials/>
</template>

<style scoped lang="scss">
@import 'static/scss/base.scss';

section {
  display: flex;
  flex-direction: column;
  align-items: center;

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

  .contacts {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: start;
    width: 940px;

    .contact {
      display: flex;
      gap: 10px;
      width: 300px;
      padding: 15px;
      background: var(--surface-background-color);
      align-items: center;
      height: max-content;
      flex-direction: column;
      @include main-border;
      border-radius: 3px;

      .icon {
        font-size: 28px;
      }

      h3 {
        font-size: 22px;
        font-weight: 700;
        line-height: 1;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      p {
        font-size: 18px;
        font-weight: 600;
        line-height: 1.5;
        word-break: break-all;
      }

      a {
        text-decoration: none;
        transition: 0.1s;
        font-size: 24px;

        &:hover {
          color: var(--main-cta-color);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  section {
    .contacts {
      flex-direction: column;
      gap: 20px;
      width: 100%;

      .contact {
        width: 100%;
      }
    }

    p {
      font-size: 20px;

      svg {
        width: 26px;
        height: 26px;
        margin-right: 5px;
      }
    }
  }
}
</style>