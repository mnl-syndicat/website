<script setup lang="ts">
const props = defineProps({
  currentTab: String,
});

const scrolled = ref(false);
const menuToggled = ref(false);
const smallScreen = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  smallScreen.value = window.innerWidth < 768;
  window.addEventListener('resize', () => {
    smallScreen.value = window.innerWidth < 768;
  });
});

const toggleNavMenu = () => {
  menuToggled.value = !menuToggled.value;
};

const links = {
  '/about': {
    label: 'À propos',
    icon: 'ph:info-bold',
  },
  '/articles': {
    label: 'Articles',
    icon: 'ph:newspaper-clipping-bold',
  },
  '/communiques': {
    label: 'Communiqués',
    icon: 'ph:megaphone-simple-bold',
  },
  '/contact': {
    label: 'Contact',
    icon: 'ph:envelope-simple-bold',
  },
  '/federations': {
    label: 'Fédérations',
    icon: 'ph:map-trifold-bold',
  },
};
</script>

<template>
  <header :class="{ scrolled }">
    <div class="nav-el">
      <Icon :name="menuToggled ? 'mdi:close' : 'mdi:menu'" v-if="smallScreen" @click="toggleNavMenu()" />
      <h3 v-if="smallScreen">MNL</h3>
      <router-link to="/"><img :src="getImage('orgLogo')" alt="Organization logo"></router-link>
    </div>

    <ul class="nav-el links-list" v-show="menuToggled || !smallScreen">
      <li v-for="(link, path) in links" :key="path" :class="{ current: path === currentTab }">
        <router-link :to="path">
          <Icon :name="link.icon" />
          {{ link.label }}
        </router-link>
      </li>
    </ul>

    <div class="nav-el buttons" v-show="menuToggled || !smallScreen">
      <btn icon="ph:user-plus-bold" :label="getString('joinButton')" href="/adherer" @click="toggleNavMenu" />
    </div>
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

  .nav-el {
    display: flex;
    justify-content: center;
    flex: 1;
  }

  .links-list {
    display: flex;
    gap: 20px;
    list-style-type: none;
    align-items: center;
    @include title-font;
    font-weight: 600;
    font-size: 18px;
    flex: 2;

    li {
      a:not(.btn) {
        transition: 0.1s ease-in-out;
        display: flex;
        gap: 3px;
        align-items: center;
      }

      & a:not(.btn):hover, &.current a {
        color: var(--main-cta-color) !important;
        font-weight: 700;
      }

      .btn {
        margin-left: 25px;
      }
    }
  }

  .buttons {
    display: flex;
    gap: 15px;
    margin-left: auto;
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
    }

    & .nav-el:first-child {
      justify-content: space-between;
      flex-direction: row;
      display: flex;
      width: 100%;
      align-items: center;
    }

    .icon:not(a .icon) {
      font-size: 32px;
    }

    img {
      width: 50px;
      height: 50px;
    }

    .links-list {
      flex-direction: column;
      gap: 15px;
      margin: 15px 0;
      align-self: start;
      align-items: start;

      li {
        a.btn {
          margin-left: 0;
        }
      }
    }

    .buttons {
      margin-left: 0;
      align-self: start;
    }
  }
}
</style>
