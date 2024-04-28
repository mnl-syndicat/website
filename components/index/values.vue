<script setup lang="ts">

</script>

<template>
  <section>
    <div class="container">
      <h2>{{ getString('valuesCategoryName') }}</h2>
      <div class="values">
        <div class="value" v-for="value in getValues()" :key="value.id">
          <div class="title">
            <img :src="value.icon" alt="icon"/>
            <h3>{{ value.title }}</h3>
          </div>
          <p>{{ value.description }}</p>
        </div>
      </div>
    </div>
    <img :src="getImage('valuesIllus')" id="valuesIllus" alt="">
  </section>
</template>

<style scoped lang="scss">
section {
  gap: 10vw;
  flex-direction: row;

  #valuesIllus {
    width: 25vw;
    border: 1px solid #000;
    object-fit: cover;
    border-radius: 3px;
  }

  .container {
    width: 30vw;
  }

  h2 {
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

@media (max-width: 768px) {
  section {
    flex-direction: column;

    #valuesIllus {
      display: none;
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