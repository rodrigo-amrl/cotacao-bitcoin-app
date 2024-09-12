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


@Options({
  components: {
    Header,
    CandleStickChart
  },
})
export default class App extends Vue {
  candleStore = getModule(CandleStore, store)
  mounted(): void {
    this.candleStore.loadInitialCandles()
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
