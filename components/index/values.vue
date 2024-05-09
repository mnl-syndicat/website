<script setup lang="ts">

</script>

<template>
  <section>
    <div class="container">
      <h1>{{ getString('valuesCategoryName') }} <btn icon="mdi:person-add" :label="getString('joinButton')" href="/adherer" @click="toggleNavMenu" /></h1>
      <div class="values">
        <div class="value" v-for="value in getValues()" :key="value.id">
          <h3 class="title"><img :src="value.icon" alt="icon"/> {{ value.title }}</h3>
          <p>{{ value.description }}</p>
        </div>
      </div>
    </div>
    <NuxtImg quality="10" :src="getImage('valuesIllus')" id="valuesIllus" alt="" />
  </section>
</template>

<style scoped lang="scss">
section {
  flex-direction: row;
  padding: 50px 5vw;

  h1 {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
  }

  #valuesIllus {
    width: 25vw;
    border: 1px solid #000;
    object-fit: cover;
    border-radius: 3px;
  }

  h3.title {
    word-break: break-all;
  }

  .container {
    width: 60vw;
    max-width: 750px;
  }

  h1 {
    margin-bottom: 20px;
  }

  .values {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 20px;

    .value {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
      width: calc(50% - 20px);

      .title {
        display: flex;
        gap: 10px;
        align-items: center;

        img {
          width: 30px;
          height: 30px;
        }

        h3 {
          font-size: 28px;
          font-weight: 900;
        }
      }

      p {
        font-weight: 700;
      }
    }
  }
}

@media (max-width: 1100px) {
  #valuesIllus {
    display: none;
  }

  section .container {
    width: 80vw;
  }
}

@media (max-width: 768px) {
  section {
    flex-direction: column;

    h1 {
      flex-direction: column;
      gap: 10px;
      align-items: start;
    }

    .container {
      width: 80vw;
    }

    .values {
      .value {
        width: 100%;
      }
    }
  }
}
</style>