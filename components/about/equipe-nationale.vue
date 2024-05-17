<template>
  <section class="about">
    <div class="container">
      <h1>{{ getString('enCategoryName') }}</h1>
      <p>{{ getString('enValue') }}</p>
    </div>
    <div class="members">
      <div class="member" v-for="member in getEnMembers()">
        <div class="title">
          <img :src="member.image" :alt="member.name" />
          <h3>{{ member.name }}</h3>
        </div>
        <p>{{ member.role }}</p>
        <div class="socials">
          <a v-if="member.email" :href="'mailto:' + member.email"><Icon name="ph:envelope-bold" /></a>
          <a v-if="member.phone" :href="'tel:' + member.phone"><Icon name="ph:phone-bold" /></a>
          <a v-if="member.instagram" :href="member.instagram" target="_blank"><Icon name="ph:instagram-logo-bold" /></a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import 'static/scss/base.scss';

.about {
  flex-direction: column;
  gap: 0;
}

.members {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: start;
  margin-top: 50px;

  .member {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 250px;
    padding: 15px;
    background: var(--surface-background-color);
    height: max-content;
    @include main-border;

    .title {
      display: flex;
      align-items: center;
      gap: 10px;

      img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        border: 0;
      }

      h3 {
        font-size: 24px;
        font-weight: 800;
        line-height: 1;
      }
    }

    p {
      font-size: 18px;
      font-weight: 600;
    }

    .socials {
      display: flex;
      gap: 10px;
      font-size: 24px;
      color: var(--main-cta-color);

      a {
        text-decoration: none;
        transition: 0.1s;

        &:hover {
          color: var(--main-cta-color);
        }
      }
    }
  }
}

@media (max-width: 768px){
  .members .member {
    width: 100%;

    img {
      width: 40px;
      height: 40px;
      display: block;
    }
  }
}
</style>
<script setup lang="ts">
</script>