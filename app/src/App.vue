<template>
  <div>
    <Header />
    <CandleStickChart :candles="candles" v-if="candles.length > 0" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from './components/Header.vue';
import CandleStickChart from './components/CandleStickChart.vue';
import { getModule } from 'vuex-module-decorators';
import store from './store';
import CandleStore from './store/modules/CandleStore';
import io from "socket.io-client"
import Candle from './models/Candle';
import { createToast } from "mosha-vue-toastify";
import 'mosha-vue-toastify/dist/style.css'

@Options({
  components: {
    Header,
    CandleStickChart
  },
})
export default class App extends Vue {
  candleStore = getModule(CandleStore, store)
  socket = io(process.env.VUE_APP_SOCKET_SERVER)
  mounted(): void {
    this.candleStore.loadInitialCandles()
    this.socket.on(process.env.VUE_APP_SOCKET_EVENT_NAME, (msg: any) => {
      const candle = new Candle(msg)
      this.candleStore.addCandle(candle)

      createToast("New Candle arrived!", { type: 'info' })
    })
  }
  get candles() {
    return this.candleStore.candles
  }

}
</script>

<style>
body {
  margin: 0;
}
</style>
