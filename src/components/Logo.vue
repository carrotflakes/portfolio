<template>
  <div>
    <img id="logo" alt="carrotflakes logo" src="../assets/logo.png"
         :style="{'display': fallbacked ? 'inline-block' : 'none'}">
    <canvas v-if="!fallbacked" ref="canvas" width="120" height="120"></canvas>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
  },
  data: () => ({
    fallbacked: false
  }),
  async mounted() {
    const canvasEl = this.$refs.canvas
    const img = await getImage()
          .catch(() => this.fallbacked = true)
    const pos = [...Array(16)].map(() => [...Array(16)].map(() => ({x: 0.0, y: 0.0, dx: (Math.random() - 0.5) * 2, dy: (Math.random() - 0.5) * 2})))
    const ctx = canvasEl.getContext('2d')
    const self = this
    function update() {
      ctx.clearRect(0, 0, 120, 120)
      for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
          const i = ((x * 20) + (y * 20) * 320) * 4
          const p = pos[y][x]
          ctx.fillStyle = `rgba(${img.data[i]}, ${img.data[i+1]}, ${img.data[i+2]}, ${img.data[i+3]})`
          ctx.fillRect(x * 6 + 8 + p.x, y * 6 + 8 + p.y, 6, 6)
          p.x += p.dx
          p.y += p.dy
          p.dx = p.dx * 0.9 - p.x / 3
          p.dy = p.dy * 0.9 - p.y / 3
        }
      }
      if (!self._isDestroyed)
        requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
    canvasEl.addEventListener('mousemove', e => {
      const rect = e.target.getBoundingClientRect()
      for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
          const p = 10 / (Math.pow((e.clientX - rect.left - 8) / 6 - x, 2) + Math.pow((e.clientY - rect.top - 8) / 6 - y, 2) + 0.5)
          pos[y][x].dx += (Math.random() - 0.5) * p
          pos[y][x].dy += (Math.random() - 0.5) * p
        }
      }
    })
  }
}

function getImage() {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = './logo.png'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      resolve(ctx.getImageData(0, 0, img.width, img.height))
    }
    img.onerror = reject
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
