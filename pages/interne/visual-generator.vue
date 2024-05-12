<script setup lang="ts">
const backgroundImageRef = ref(null)
const imageUploadRef = ref(null)
const svgRef = ref(null)
const noiseImageRef = ref(null)
const brightness = ref(115)
const contrast = ref(134)
const loading = ref(false)

const updateCanvas = async () => {
  const file = imageUploadRef.value?.files?.[0]

  const fr = new FileReader;
  fr.readAsDataURL(file)
  fr.onload = () => {
    const img = new Image;
    img.src = fr.result as string
    img.onload = (event) => {
      const image = event.target as HTMLImageElement;
      backgroundImageRef.value.attributes['href'].value = fr.result as string
      svgRef.value.width.baseVal.value = image.width
      svgRef.value.height.baseVal.value = image.height
      svgRef.value.viewBox.baseVal.width = image.width
      svgRef.value.viewBox.baseVal.height = image.height

      const max = Math.max(image.width, image.height)
      noiseImageRef.value.width.baseVal.value = max
      noiseImageRef.value.height.baseVal.value = max
    }
  }
}

onMounted(async () => {
  imageUploadRef.value.addEventListener('change', async () => {
    await updateCanvas()
  })
});

watch([brightness, contrast], async () => {
  await updateCanvas()
})

const downloadImage = async () => {
  loading.value = true
  const noiseImage = new Image();
  const max = Math.max(svgRef.value.width.baseVal.value, svgRef.value.height.baseVal.value)
  noiseImage.src = '/images/noise.png'
  noiseImage.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = max
    canvas.height = max
    const ctx = canvas.getContext('2d')
    ctx.drawImage(noiseImage, 0, 0, max, max)
    noiseImageRef.value.attributes['href'].value = canvas.toDataURL()
  }

  await new Promise(resolve => setTimeout(resolve, 1000))

  const canvas = document.querySelector('canvas')
  canvas.width = svgRef.value.width.baseVal.value
  canvas.height = svgRef.value.height.baseVal.value

  const data = new XMLSerializer().serializeToString(svgRef.value)
  const win = window.URL || window.webkitURL || window
  const img = new Image();
  const blob = new Blob([data], {type: 'image/svg+xml'})
  const url = win.createObjectURL(blob)
  img.src = url

  img.onload = () => {
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0);
    win.revokeObjectURL(url);
  }

  await new Promise(resolve => setTimeout(resolve, 5000))

  const link = document.createElement('a')
  link.download = 'image.png'
  link.href = canvas.toDataURL()
  link.click()
  noiseImageRef.value.attributes['href'].value = '/noise.png'
  loading.value = false
}
</script>

<template>
  <top-bar current-tab="/interne/visual-generator" :internal="true"/>
  <section class="materiel">
    <h1>GÉNÉRATEUR D'IMAGE D'ILLUSTRATION</h1>

    <div class="container">
      <div class="input">
        <label>
          <Icon name="ph:image-bold"/>
          Image de fond</label>
        <input type="file" accept="image/*" ref="imageUploadRef"/>

        <label>
          <Icon name="ph:sun-bold"/>
          Luminosité</label>
        <input type="range" min="0" max="200" step="1" v-model="brightness"/>

        <label>
          <Icon name="ph:circle-half-bold"/>
          Contraste</label>
        <input type="range" min="0" max="300" step="1" v-model="contrast"/>

        <btn label="Télécharger" icon="ph:download-bold" @click="downloadImage" v-if="!loading"/>
        <btn label="Patientez" icon="ph:hourglass-bold" v-else/>
      </div>
      <canvas></canvas>
      <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" ref="svgRef">
        <defs>
          <pattern id="pattern0" patternUnits="userSpaceOnUse" width="100%" height="100%">
            <image href="" width="100%" height="100%"
                   ref="backgroundImageRef"/>
          </pattern>
          <pattern id="pattern1" patternUnits="userSpaceOnUse" width="100%" height="100%">
            <image href="/noise.png" width="4096" height="4096"
                   ref="noiseImageRef"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pattern0)"
              :style="'filter: saturate(0%) contrast(' + contrast + '%) brightness(' + brightness + '%)'"/>
        <rect width="100%" height="100%" fill="#5A2783" fill-opacity="0.3"/>
        <rect width="100%" height="100%" fill="#5A2783" fill-opacity="0.2" style="mix-blend-mode: overlay"/>
        <rect width="100%" height="100%" fill="url(#pattern1)" fill-opacity="0.8" style="mix-blend-mode: overlay"/>
      </svg>
    </div>
  </section>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 50px;

  .input {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  input[type="range"] {
    padding: 0;
  }

  canvas {
    display: none;
  }

  svg:not(.icon) {
    max-height: 40%;
    max-width: 40%;
    width: max-content;
    height: max-content;
  }
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;

    .input {
      width: 100%;
    }

    svg:not(.icon) {
      max-height: 80%;
      max-width: 100%;
    }
  }
}
</style>