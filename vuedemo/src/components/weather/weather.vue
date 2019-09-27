<template>
  <div class="weather-container">
    <v-app>
      <v-card class="mx-auto" color="#F9F9F9" width="100%" min-width="320">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline">{{city}}</v-list-item-title>
            <v-list-item-subtitle
              v-if="loading"
            >{{forecast[index].day }}, {{updateLoc | dateFormat('HH:mm')}} {{forecast[index].txtD}}转{{forecast[index].txtN}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-row align="center">
            <v-col class="display-3" cols="6" v-if="loading">{{weatherList[index].tmp_max}}&deg;C</v-col>

            <v-col cols="6">
              <v-icon size="70" color="#6e5b98" v-if="loading">{{forecast[index].icon}}</v-icon>
            </v-col>
          </v-row>
        </v-card-text>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-send</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle v-if="loading">风速: {{weatherList[index].wind_spd}} km/h</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-cloud-download</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle v-if="loading">相对湿度: {{weatherList[index].hum}}%</v-list-item-subtitle>
        </v-list-item>

        <v-slider v-model="time" :max="6" :tick-labels="labels" class="mx-4" ticks></v-slider>

        <v-list class="transparent">
          <v-list-item v-for="item in forecast" :key="item.day">
            <v-list-item-title>{{ item.day }}</v-list-item-title>

            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-subtitle class="text-right">{{ item.temp }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

      
      </v-card>
    </v-app>
  <v-card-actions>
           <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" >
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="#6e5b98">
          <v-btn icon dark @click="dialog = false">
            <v-icon @click="show">mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>选择城市</v-toolbar-title>
          <div class="flex-grow-1"></div>
       
        </v-toolbar>
             
        <v-divider></v-divider>
      
      </v-card>
    </v-dialog>
  </v-row>
        </v-card-actions>
          <selectcity></selectcity>
  </div>
  
</template>

<script>
import selectcity from '../subcomponent/selectcity.vue'
export default {
  data() {
    return {
      labels: [],
      time: 0,
      forecast: [],
      weatherList: [],
      city: "",
      index: 0,
      loading: false,
      updateLoc: "",
       dialog: false,
    };
  },
  created() {
    this.getWeather();
    //https://free-api.heweather.net/s6/weather/now?location=chongqing&key=0d347f7c994e4f8199162ed144123bd7
    //https://music-api-jwzcyzizya.now.sh/api/search/song/netease?key=刘瑞琦&limit=5&page=1
  },
  watch: {
    time(val) {
     
      this.index = this.time;
    }
  },
  methods: {
    getWeather() {
      this.axios
        .get(
          "https://free-api.heweather.net/s6/weather/forecast?location=chongqing&key=0d347f7c994e4f8199162ed144123bd7"
        )
        .then(result => {
          
          if (result.status === 200) {
           
            const weekArray = new Array(
              "星期日",
              "星期一",
              "星期二",
              "星期三",
              "星期四",
              "星期五",
              "星期六"
            );
            const weekArrayEng = new Array(
              "Su",
              "Mo",
              "Tu",
              "We",
              "Th",
              "Fr",
              "Sa"
            );

            this.city = result.data.HeWeather6[0].basic.location;
            this.updateLoc = result.data.HeWeather6[0].update.loc;
           
            this.weatherList = result.data.HeWeather6[0].daily_forecast;
            for (let d in this.weatherList) {
              this.forecast[d] = {
                txtD: this.weatherList[d].cond_txt_d,
                txtN: this.weatherList[d].cond_txt_n,
                time: Number(d)
              };

              this.forecast[d].temp =
                this.weatherList[d].tmp_max +
                "\xB0/" +
                this.weatherList[d].tmp_min +
                "\xB0";
              this.forecast[d].day =
                weekArray[new Date(this.weatherList[d].date).getDay()];
              // this.forecast[d]['txtN']=this.weatherList[d].cond_txt_n
              this.labels.push(
                weekArrayEng[new Date(this.weatherList[d].date).getDay()]
              );
              switch (this.forecast[d].txtD) {
                case "晴":
                  this.forecast[d].icon = "mdi-white-balance-sunny";
                  break;
                case "阴":
                  this.forecast[d].icon = "mdi-cloud";
                  break;
                case "多云":
                  this.forecast[d].icon = "mdi-weather-cloudy";
                  break;
                case "小雨":
                  this.forecast[d].icon = "mdi-weather-rainy";
                  break;
              }
            }
            this.loading = true;
           
          } else {
            console.log("error");
          }
        });
    },
    show(){
      console.log("1");
    }
  },
  components:{
    selectcity,
  }
};
</script>
<style lang="scss" scoped>
.weather-container{
  margin-bottom: 56px;
}
.v-application ul{
  padding-left: 0;
}
.mint-indexlist-nav{
  position: fixed
}
</style>