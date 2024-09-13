<template>
    <div>
        <apexchart v-if="series.length > 0" type="candlestick" height="350" :options="chartOptions" :series="series">
        </apexchart>

    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import VueApexCharts from 'vue3-apexcharts';
import { Prop, PropSync } from "vue-property-decorator"
@Options({
    components: {
        apexchart: VueApexCharts
    }
})
export default class CandleStickChart extends Vue {
    @PropSync('candles', { type: Array }) syncCandle!: Array<string>

    chartOptions = {
        chart: {
            type: 'candlestick',
            height: 350
        },
        title: {
            text: 'Bitcoin last prices',
            align: 'center'
        },
        xaxis: {
            type: 'time'
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        }
    }
    get series() {
        return [{
            data: this.syncCandle
        }]
    }
}
</script>