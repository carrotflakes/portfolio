<template>
  <div id="app">
    <div v-for="(circle, index) in circles" :key="index"
         class="circle"
         :style="{'top': circle.y + 'px', 'left': circle.x + 'px'}">
    </div>
    <div id="logo-container">
      <img id="logo" alt="carrotflakes logo" src="./assets/logo.png">
    </div>
    <div style="font-size: 2em;">
      carrotflakes
    </div>
    <div class="icons-container">
      <a href="https://github.com/carrotflakes" target="_blank" rel="noopener noreferrer">
        <img height="32" width="32"
             src="https://unpkg.com/simple-icons@latest/icons/github.svg" />
      </a>
      <a href="https://twitter.com/carrotflakes" target="_blank" rel="noopener noreferrer">
        <img height="32" width="32"
             src="https://unpkg.com/simple-icons@latest/icons/twitter.svg" />
      </a>
    </div>
    <a href="#" @click.prevent="play">
      play
    </a>
  </div>
</template>

<script>
import {play} from './bgm'

export default {
  name: 'app',
  data: function () {
    return {
      circles: []
    }
  },
  methods: {
    play: function () {
      play(() => {
          this.circles.push({
              x: 100 + Math.random() * (document.body.clientWidth - 200),
              y: 100 + Math.random() * (document.body.clientHeight - 200)
          })
      })
    }
  },
  components: {
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #ddd;
  color: #2c3e50;
  padding: 60px;
  position: relative;
  overflow: hidden;
}

#logo-container {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  background: #eee;
  border-radius: 100px;
}

#logo {
  width: 100px;
  height: 100px;
  margin: 5px 0 0 -5px;
}

.icons-container > a > img {
  margin: 10px;
}

.circle {
  position: absolute;
  background: #aaa;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  opacity: 0.0;

  animation: pulsate 8s ease-out;
}

@keyframes pulsate {
  0%   { transform: scale(0, 0); opacity: 1.0; }
  100% { transform: scale(4, 4); opacity: 0.0; }
}
</style>
