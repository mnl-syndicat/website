<script setup lang="ts">
const zipCode = ref('00')
const zipTextX = computed(() => {
  return 570 + (zipCode.value.length * 110) / 2
})
const backgroundType = ref('color')
const backgroundColor = ref('#5A3C5A')
const backgroundImage = ref<HTMLInputElement>()
const backgroundPatternImage = ref<SVGImageElement>()
const backgroundRect = ref<SVGRectElement>()
const logoSvg = ref<SVGSVGElement>()
const canvas = ref<HTMLCanvasElement>()

watch(zipCode, (newValue) => {
  updateCanvas()

  if (newValue.length > 2) {
    zipCode.value = newValue.slice(0, 2)
  }
})

watch(backgroundType, () => {
  updateCanvas()
})

watch(backgroundColor, () => {
  updateCanvas()
})


const updateImage = async () => {
  backgroundColor.value = "#000"

  const file = ref<File>()

  if (backgroundImage.value!.files && backgroundImage.value!.files![0]) {
    file.value = backgroundImage.value!.files[0]
  } else {
    return
  }

  const reader = new FileReader()

  reader.onload = () => {
    const img = new Image()
    if (typeof reader.result === "string") {
      img.src = reader.result
    }
    img.onload = async () => {
      const tempCanvas = document.createElement('canvas')
      const ctx = tempCanvas.getContext('2d')
      tempCanvas.width = img.width
      tempCanvas.height = img.height
      ctx!.drawImage(img, 0, 0, img.width, img.height)
      backgroundPatternImage.value!.setAttribute('href', tempCanvas.toDataURL())
      backgroundRect.value!.setAttribute('fill', 'url(#backgroundPattern)')

      const paths = logoSvg.value!.querySelectorAll('path, #numRect')
      for (const path of paths) {
        path.setAttribute('filter', 'url(#shadow)')
      }

      await new Promise(resolve => setTimeout(resolve, 1000))

      await updateCanvas()
    }
  }

  reader.readAsDataURL(file.value)
}

const downloadLogo = () => {
  const link = document.createElement('a')
  link.download = 'logo.png'
  link.href = canvas.value!.toDataURL()
  link.click()
}

const updateCanvas = async () => {
  await new Promise(resolve => setTimeout(resolve, 100))
  const ctx = canvas.value!.getContext('2d')
  const svgString = new XMLSerializer().serializeToString(logoSvg.value!)
  const img = new Image()
  const blob = new Blob([svgString], {type: 'image/svg+xml'})
  const url = URL.createObjectURL(blob)
  img.src = url

  img.onload = () => {
    ctx!.drawImage(img, 0, 0)
    URL.revokeObjectURL(url)
  }
}

onMounted(async () => {
  await updateCanvas()
});
</script>

<template>
  <top-bar current-tab="/interne/logo-generator" :internal="true"/>
  <section class="materiel">
    <h1>GÉNÉRATEUR DE LOGOS</h1>

    <div class="container">
      <div class="input">
        <label for="zipCode"><Icon name="ph:map-pin-bold" /> Code postal :</label>
        <input v-model="zipCode" type="text" placeholder="Code postal" />

        <label for="backgroundType"><Icon name="ph:palette-bold" /> Type de fond :</label>
        <select v-model="backgroundType" id="backgroundType">
          <option value="color">Couleur</option>
          <option value="image">Image</option>
        </select>

        <label for="backgroundColor" v-if="backgroundType === 'color'"><Icon name="ph:eyedropper-bold" /> Couleur de fond :</label>
        <input type="color" id="backgroundColor" v-if="backgroundType === 'color'" v-model="backgroundColor" />

        <label for="backgroundImage" v-if="backgroundType === 'image'"><Icon name="ph:image-bold" /> Image de fond :</label>
        <input type="file" v-if="backgroundType === 'image'" accept="image/*" v-on:change="updateImage" ref="backgroundImage" />

        <btn label="Télécharger" icon="ph:download-bold" @click="downloadLogo()" />
      </div>
      <canvas height="300" width="300" ref="canvas"></canvas>
      <svg width="300" height="300" viewBox="0 0 1009 1000" fill="none" xmlns="http://www.w3.org/2000/svg" class="logoSvg" ref="logoSvg">
        <defs>
          <pattern id="backgroundPattern" patternUnits="userSpaceOnUse" width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <image href="" width="100%" height="100%" ref="backgroundPatternImage" preserveAspectRatio="xMidYMid slice" />
          </pattern>
          <filter id="shadow" x="-2" y="-2" height="150" width="150" >
            <feDropShadow dx="0" dy="0" stdDeviation="15"  flood-color="black" flood-opacity="0.4" />
          </filter>
        </defs>
        <rect width="1000" height="1000" :fill="backgroundColor" ref="backgroundRect" />
        <path d="M434.59 252.309C440.881 248.572 446.71 244.734 452.915 241.655C454.886 240.677 458.303 240.97 460.216 242.103C461.482 242.853 461.905 246.252 461.546 248.257C460.866 252.053 459.893 255.99 458.085 259.353C452.246 270.215 451.303 281.965 451.035 293.883C450.995 295.684 451.356 297.615 452.024 299.29C455.408 307.776 458.736 316.297 462.544 324.595C464.215 328.234 463.442 329.776 459.891 330.924C455.869 332.224 451.784 333.514 448.024 335.401C436.297 341.285 428.745 352.039 426.401 363.646C423.782 376.615 424.837 390.847 433.329 402.744C441.201 413.772 449.848 423.889 463.597 427.937C465.373 428.459 466.88 429.897 469.019 431.226C467.804 432.066 467.331 432.655 466.785 432.732C454.704 434.453 444.328 440.058 434.577 446.981C432.396 448.53 430.454 450.546 428.772 452.643C423.574 459.123 423.663 465.527 429.464 471.364C442.511 484.491 458.12 492.668 476.591 495.392C499.529 498.775 521.944 498.19 543.144 487.506C553.506 482.284 562.494 475.673 565.182 463.336C566.35 457.981 567.757 452.692 575.12 455.495C579.104 444 579.104 444 570.722 436.63C570.467 436.406 570.235 436.146 569.952 435.965C557.581 428.055 551.633 416.968 552.826 402.123C552.936 400.757 551.547 398.612 550.261 397.902C543.149 393.972 535.948 390.172 528.592 386.723C521.975 383.621 519.352 384.22 514.303 389.42C510.524 393.313 507.014 397.468 502.991 401.944C489.151 387.657 476.209 374.298 462.283 359.923C464.31 358.416 466.265 357.301 467.802 355.768C492.679 330.968 517.617 306.227 542.305 281.24C565.158 258.112 583.437 231.34 598.021 202.636C616.759 165.756 631.689 127.162 636.391 85.46C636.518 84.3324 636.834 83.2262 637.251 81.1878C647.103 86.364 656.621 91.0232 665.814 96.2533C704.524 118.276 735.211 148.629 758.706 186.37C761.84 191.406 765.016 196.418 768.267 201.379C770.611 204.955 770.273 206.904 765.896 208.907C738.341 221.515 710.767 234.105 683.534 247.387C648.39 264.528 617.572 288.181 587.589 312.958C582.115 317.482 581.784 319.478 585.672 325.489C590.908 333.587 596.456 341.483 601.625 349.105C602.351 349.277 602.592 349.398 602.652 349.338C611.06 340.938 613.101 351.339 617.721 354.326C619.047 355.183 621.052 355.868 622.483 355.528C627.679 354.294 629.829 357.03 631.325 361.294C632.738 365.325 634.83 368.338 639.989 368.219C641.614 368.181 643.621 370.332 644.886 371.93C647.847 375.672 650.472 379.681 653.213 383.596C653.493 383.995 653.85 384.506 653.814 384.935C653.21 392 655.377 399.144 650.669 406.005C641.563 419.274 633.244 433.088 624.802 446.801C623.443 449.009 622.929 451.819 622.368 454.425C612.929 498.307 603.546 542.202 594.134 586.09C593.994 586.74 593.646 587.346 593.225 588.399C506.149 589.556 418.963 590.714 331.292 591.879C331.184 590.162 331.015 588.71 331.014 587.258C330.999 557.896 330.946 528.535 331.115 499.174C331.128 496.929 332.202 494.235 333.681 492.53C341.353 483.688 349.4 475.173 357.146 466.394C361.597 461.35 362.932 451.376 359.225 446.024C357.727 443.861 353.958 442.449 351.089 442.195C337.537 440.99 324.289 442.431 312.293 449.495C298.889 457.388 285.631 465.531 272.366 473.658C269.928 475.151 267.76 477.086 264.961 479.2C263.838 477.011 262.75 475.188 261.931 473.252C243.332 429.271 224.644 385.328 206.266 341.255C201.277 329.29 200.582 317.145 208.973 306.036C210.454 304.075 212.446 302.313 214.553 301.039C239.208 286.133 264.081 271.583 288.587 256.436C308.051 244.405 324.549 228.713 340.332 212.274C342.063 210.471 343.688 208.566 345.362 206.708C345.786 206.882 346.211 207.057 346.635 207.231C345.685 214.977 344.807 222.732 343.762 230.465C342.902 236.83 344.658 240.616 350.606 242.807C367.921 249.185 385.273 255.468 402.708 261.504C410.023 264.037 417.247 264.038 423.879 258.861C427.06 256.377 430.792 254.599 434.59 252.309Z" fill="#FFFEFF" filter=""/>
        <path d="M394.404 719.01C394.404 715.506 394.404 712.499 394.404 709.492C394.096 709.408 393.788 709.324 393.479 709.24C392.698 710.977 391.855 712.689 391.146 714.455C381.992 737.233 372.744 759.974 363.832 782.846C362.384 786.561 360.555 787.527 356.824 787.445C345.799 787.202 334.763 787.208 323.739 787.444C320.14 787.52 318.503 786.488 317.308 782.945C309.461 759.688 301.337 736.524 293.293 713.333C292.648 711.472 291.926 709.637 290.371 707.939C290.371 734.233 290.371 760.527 290.371 787.087C275.354 787.087 260.829 787.087 245.94 787.087C245.94 731.489 245.94 675.917 245.94 619.902C247.312 619.801 248.787 619.6 250.263 619.598C266.553 619.575 282.845 619.724 299.131 619.476C302.806 619.421 304.054 620.873 305.127 623.991C316.641 657.446 328.281 690.857 339.89 724.279C340.383 725.698 340.917 727.103 341.737 729.351C347.154 714.826 352.299 701.055 357.426 687.276C365.278 666.176 373.171 645.09 380.9 623.945C382.037 620.835 383.382 619.431 387.005 619.482C403.432 619.714 419.864 619.583 436.599 619.583C436.599 675.58 436.599 731.139 436.599 787.029C422.759 787.029 408.937 787.029 394.404 787.029C394.404 764.512 394.404 742.009 394.404 719.01Z" fill="#FEFEFE" filter=""/>
        <path d="M574.338 823.068C638.636 823.068 702.425 823.068 766.631 823.068C766.631 837.228 766.631 851.047 766.631 865.225C592.633 865.225 418.413 865.225 243.812 865.225C243.812 851.568 243.812 837.744 243.812 823.068C353.722 823.068 463.775 823.068 574.338 823.068Z" fill="#FEFDFE" filter=""/>
        <path d="M467.645 762.729C467.645 714.918 467.645 667.617 467.645 619.584C469.837 619.584 471.642 619.584 473.448 619.584C486.001 619.584 498.562 619.837 511.103 619.451C515.701 619.31 518.013 620.994 520.274 624.734C535.083 649.239 550.125 673.603 565.095 698.01C566.152 699.733 567.238 701.436 569.041 704.314C569.041 675.451 569.041 647.817 569.041 619.886C585.342 619.886 601.035 619.886 616.987 619.886C616.987 675.662 616.987 731.218 616.987 787.329C603.325 787.329 589.813 787.427 576.307 787.173C575.004 787.148 573.431 785.136 572.507 783.707C554.374 755.679 536.32 727.601 518.246 699.535C517.34 698.128 516.401 696.742 514.583 693.993C514.583 725.947 514.583 756.411 514.583 787.113C498.7 787.113 483.504 787.113 467.645 787.113C467.645 779.073 467.645 771.156 467.645 762.729Z" fill="#FEFEFE" filter=""/>
        <path d="M648.438 711.812C648.438 680.965 648.438 650.628 648.438 619.954C664.678 619.954 680.531 619.954 696.956 619.954C696.956 661.639 696.956 703.254 696.956 745.267C719.673 745.267 741.826 745.267 764.393 745.267C764.393 759.419 764.393 773.175 764.393 787.146C725.861 787.146 687.444 787.146 648.438 787.146C648.438 762.062 648.438 737.192 648.438 711.812Z" fill="#FEFDFE" filter="" />
        <rect x="640" y="400" width="211" height="212" rx="105.5" fill="white" id="numRect" filter=""/>
        <text :fill="backgroundColor" xml:space="preserve" style="white-space: pre" font-size="110" font-weight="900" letter-spacing="0em" font-family="sans-serif" filter=""><tspan :x="zipTextX" y="547.435">{{ zipCode }}</tspan></text>
      </svg>
    </div>
  </section>
</template>

<style scoped lang="scss">
.logoSvg tspan {
    text-transform: full-width;
    letter-spacing: -40px;
}

canvas {
  border-radius: 3px;
}

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
}

.logoSvg {
  display: none;
}

#backgroundColor {
  height: 50px;
  padding: 0;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    width: 100%;

    .input {
      width: 100%;
    }
  }
}
</style>