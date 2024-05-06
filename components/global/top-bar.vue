<script setup lang="ts">
let scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

const showNavMenu = () => {
  const nav = document.querySelector('li')
  nav.classList.toggle('show')
}

const hideNavMenu = () => {
  const nav = document.querySelector('li')
  nav.classList.remove('show')
}
</script>

<template>
  <header :class="scrolled ? 'scrolled' : ''">
    <div class="left">
      <Icon name="mdi:menu" v-on:click="showNavMenu()"/>
      <router-link to="/"><h1>MNL</h1></router-link>
      <router-link to="/"><img :src="getImage('orgLogo')" alt="Organization logo"></router-link>
    </div>

    <li>
      <router-link to="/about" @click="hideNavMenu">À Propos</router-link>
      <router-link to="/articles" @click="hideNavMenu">Articles</router-link>
      <router-link to="/contact" @click="hideNavMenu">Contact</router-link>
      <router-link to="/federations" @click="hideNavMenu">Fédérations</router-link>
      <router-link to="/materiel" @click="hideNavMenu">Matériel</router-link>
      <btn icon="mdi:person-add" :label="getString('joinButton')" href="/adherer" @click="hideNavMenu" />
    </li>
  </header>
</template>

<style scoped lang="scss">
@import 'static/scss/fonts.scss';

header {
  width: 100vw;
  height: 125px;
  z-index: 100;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid black;
  align-items: center;
  position: fixed;
  background: rgba(255, 255, 255, 1);
  top: 0;
  backdrop-filter: blur(15px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.1s;

  .icon, h1 {
    display: none;
  }

  &.scrolled {
    background: rgba(255, 255, 255, 0.8);
    height: 90px;

    img {
      width: 60px;
      height: 60px;
    }
  }

  img {
    width: 72px;
    height: 72px;
    transition: all 0.1s;
  }

  li {
    display: flex;
    list-style-type: none;
    gap: 15px;
    align-items: center;
    @include title-font;
    font-weight: 600;
    font-size: 18px;

    a:not(.btn) {
      transition: 0.1s ease-in-out;

      &:hover {
        color: var(--darker-cta-color);
        font-weight: 700;
      }
    }

    .btn {
      margin-left: 25px;
    }
  }
}

@media (max-width: 768px) {
  header {
    padding: 15px 25px;
    height: max-content;
    min-height: 80px;
    flex-direction: column;

    &.scrolled {
      height: max-content;
      img {
        width: 50px;
        height: 50px;
      }
    }

    .left {
      justify-content: space-between;
      flex-direction: row;
      display: flex;
      width: 100%;
      align-items: center;
    }

    .icon {
      display: block;
      font-size: 32px;
    }

    h1 {
      display: block;
      font-size: 32px;
    }

    img {
      width: 50px;
      height: 50px;
    }

    li {
      flex-direction: column;
      gap: 15px;
      margin: 15px 0;
      align-items: start;
      width: 100%;

      a {
        margin-left: 0;
      }
    }

    li:not(li.show) {
      display: none;
    }
  }
}
</style>