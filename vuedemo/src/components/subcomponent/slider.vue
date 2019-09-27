<!-- 播放器组件 -->
<template>
  <div>
    <div>
      <div class="musicimg-container"></div>
      <div class="progressbar" @click="playMusic" ref="runfatbar">
        <div class="bar">
          <div class="greenbar" ref="runbar">
            <span class="yuan" draggable="true"></span>
          </div>
        </div>
      </div>

      <div class="time-container">
        <div class="time-text">{{cTime}}</div>
        <div class="audio-btn">
          <v-list-item-icon @click="switchAudio('top')">
            <v-btn icon>
              <v-icon>mdi-skip-previous</v-icon>
            </v-btn>
          </v-list-item-icon>

          <v-list-item-icon>
            <div class="circleProgress_container">
              <div class="circleProgress_wrapper">
                <div class="wrapper right">
                  <div class="circleProgress rightcircle" ref="yuanright"></div>
                </div>
                <div class="wrapper left">
                  <div class="circleProgress leftcircle" ref="yuanleft"></div>
                </div>
              </div>
            </div>
            <v-btn icon @click="audioState">
              <v-icon v-show="downIcon">mdi-play</v-icon>
              <v-icon v-show="!downIcon">mdi-pause</v-icon>
            </v-btn>
          </v-list-item-icon>

          <v-list-item-icon>
            <v-btn icon @click="switchAudio('bottom')">
              <v-icon>mdi-skip-next</v-icon>
            </v-btn>
          </v-list-item-icon>
        </div>
        <div class="right-time time-text">{{dTime}}</div>
      </div>

      <div>
        <audio ref="player" :src="musicList[id].url"></audio>
      </div>
    </div>
    <!-- 这里是圆形进度条 -->
  </div>
</template>
<script>
export default {
  name: "music-view",

  components: {},

  props: {
    type: ""
  },

  data() {
    return {
      id: 0,
      downIcon: true,
      cTime: "00:00", // 已播放时间
      dTime: "00:00", // 总播放时间
      play: false, // 播放暂停按钮
      audioHttp: "http://music.163.com/song/media/outer/url?id=666108.mp3", // 音频链接
      progress: 0,
      slider: 40,
      downIcon: true,
      interval: 1000,
      musicList: [
        {
          url: "http://music.163.com/song/media/outer/url?id=666108.mp3"
        },
        {
          url: "http://music.163.com/song/media/outer/url?id=27770723.mp3"
        },
        {
          url: "http://music.163.com/song/media/outer/url?id=34497243.mp3"
        },
        {
          url: "http://music.163.com/song/media/outer/url?id=454711161.mp3"
        },
        {
          url: "http://music.163.com/song/media/outer/url?id=439076801.mp3"
        }
      ],
      audio1: {
        // 该字段是音频是否处于播放状态的属性
        playing: false,

        // 音频当前播放时长
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0,
        minTime: 0,
        step: 0.1
      }
    };
  },

  mounted() {
    const music = this.$refs.player; // 音频所在对象
    const musicBar = this.$refs.runbar; // 颜色进度条所在对象
    const musicWidth = this.$refs.runfatbar.offsetWidth; // 底部进度条总宽
    const rightCircle = this.$refs.yuanright.style; // 圆形滚动进度条右边
    const leftCircle = this.$refs.yuanleft.style; // 圆形滚动进度条左边

    // 获得音频加载完成可播放时的处理
    music.addEventListener("canplay", () => {
      const musicTime = music.duration; // 获得音频时长
      const branch = Math.floor(musicTime / 60); // 计算音频分钟
      const second = Math.ceil(musicTime % 60); // 计算音频秒
      if (branch < 10 && second < 10) {
        // 四种情况判断音频总时间
        this.dTime = `0${branch}:0${second}`;
      } else if (branch < 10) {
        this.dTime = `0${branch}:${second}`;
      } else if (second < 10) {
        this.dTime = `${branch}:0${second}`;
      } else {
        this.dTime = `${branch}:${second}`;
      }
    });

    // 获得音频正在播放时的处理
    music.addEventListener(
      "timeupdate",
      () => {
        const musicTime = music.duration; // 获得音频时长
        const circleTime = musicTime / 360; // 计算总时长占据360度每一度的比例
        const stopTime = music.currentTime; // 获得已播放的音频时长
        const rightDeg = -135 + stopTime / circleTime; // 计算出当前旋转度数

        if (rightDeg < 45) {
          // 如果当前度数小于45就证明在右边
          rightCircle.display = "block"; // 显示右边圆
          rightCircle.transform = `rotate(${rightDeg}deg)`; // 赋值给CSS右边圆旋转度数
          leftCircle.display = "none"; // 隐藏左边园（预防切歌的时候右边已清除）
        } else if (rightDeg === 45 || rightDeg > 45) {
          // 如果当前度数等于或大于45就证明在左边
          rightCircle.display = "block"; // 显示右边圆（预防直接点击快进的时候右边无显示）
          leftCircle.display = "block"; // 显示左边圆
          rightCircle.transform = "rotate(45deg)"; // 固定右边旋转度数
          const leftDeg = -135 + (stopTime - musicTime / 2) / circleTime; // 计算出当前左边旋转度数
          leftCircle.transform = `rotate(${leftDeg}deg)`; // 赋值给CSS右边圆旋转度数
        }
        musicBar.style.width = `${(stopTime / musicTime) * 100}%`; // 计算进度条所在比例宽度
        const branch = Math.floor(stopTime / 60); // 计算已播放的音频分钟
        const second = Math.floor(stopTime % 60); // 计算已播放的音频秒
        if (branch < 10 && second < 10) {
          // 四种情况判断显示音频以播放时间
          this.cTime = `0${branch}:0${second}`;
        } else if (branch < 10) {
          this.cTime = `0${branch}:${second}`;
        } else if (second < 10) {
          this.cTime = `${branch}:0${second}`;
        } else {
          this.cTime = `${branch}:${second}`;
        }
        if (stopTime == musicTime) {
          if (this.id >= this.musicList.length - 1) {
            this.id = 0;

            this.switchAudio("bottom");
          } else {
            this.id++;

            this.switchAudio("bottom");
          }
        }
      },
      { passive: true }
    );
    // 监听颜色进度条是否触摸拖动
    musicBar.addEventListener(
      "touchmove",
      event => {
        const events = event.targetTouches[0].pageX; // 获得触摸拖动的距离
        musicBar.style.width = `${(events / musicWidth) * 100}%`; // 计算进度条所在比例宽度
        music.pause(); // 触摸拖动时停止播放
      },
      { passive: true }
    );

    // 监听颜色进度条是否触摸拖动结束
    musicBar.addEventListener("touchend", () => {
      const touwidth = musicBar.offsetWidth / musicWidth; // 计算进度条所在比例
      music.currentTime = music.duration * touwidth; // 通过所在比例赋值给音频应在的播放时间
      music.play(); // 根据播放时间开始播放
      this.play = true; // 更改播放暂停按钮为播放
    });

    // 这里顺便写的，适用于PC端。鼠标事件
    // musicBar.addEventListener('drag', (e) => {
    //   const events = e.pageX
    //   musicBar.style.width = `${(events / musicWidth) * 100}%`
    // })
    // musicBar.addEventListener('dragend', (e) => {
    //   const events = e.pageX
    //   musicBar.style.width = `${(events / musicWidth) * 100}%`
    //   this.playMusic()
    // })
  },

  computed: {},

  methods: {
    // 点击进度条事件
    playMusic(e) {
      const music = this.$refs.player; // 音频所在对象
      const barWidth = e.pageX / this.$refs.runfatbar.offsetWidth; // 计算点击位置相对父元素总宽的比例
      this.$refs.runbar.style.width = `${barWidth * 100}%`; // 进度条应所在的比例总宽
      music.currentTime = music.duration * barWidth; // 计算点击时应播放所在的时间
      music.play(); // 播放音频
      this.play = true; // 更改播放暂停按钮为播放
      this.downIcon = false; //更改图标
    },

    // 点击播放暂停按钮时间
    audioState() {
      this.play = !this.play; // 更改播放暂停按钮状态
      const music = this.$refs.player; // 音频所在对象
      if (this.play) {
        music.play(); // 播放音
        this.downIcon = false;
      } else {
        music.pause(); // 暂停音乐
        this.downIcon = true;
      }
    },

    // 切换歌曲按钮
    switchAudio(value) {
      const music = this.$refs.player;
      if (value === "top") {
        if (this.id <= 0) {
          this.id = this.musicList.length - 1;
          this.downIcon = !false;
        } else {
          this.id--;
          this.downIcon = !false;
        }
      } else if (value === "bottom") {
        this.id++;
        this.downIcon = !false;
      }

      this.play = false; // 播放按钮为暂停
      this.$refs.runbar.style.width = 0; // 清空颜色进度条
      this.$refs.yuanright.style.display = "none"; // 清空圆形颜色进度条
      this.$refs.yuanleft.style.display = "none"; // 清空圆形颜色进度条
    },
    //切换图标状态
    changeStart() {
      this.isStore = !this.isStore;
      const audio = document.getElementById("audio");
      if (!this.isStore) {
        audio.play();
        this.downIcon = !this.downIcon;
      } else {
        audio.pause();
        this.downIcon = !this.downIcon;
      }
    },
    changeProgress() {
      const audio = document.getElementById("audio");
      const timer = setInterval(() => {
        const numbers = audio.currentTime / audio.duration;
        let perNumber = (numbers * 100).toFixed(5);
        this.progress = perNumber;
        if (perNumber >= 100) {
          this.isStore = true;
          this.progress = 0;
          this.downIcon = true;
          clearInterval(timer);
        }
      }, 30);
    }
  }
};
</script>
<style lang="scss" scoped>
.circleProgress_container {
  position: absolute;
}
.circleProgress_wrapper {
  width: 40px;
  height: 40px;

  position: relative;
}

.wrapper {
  width: 20px;
  height: 40px;
  position: absolute;
  top: 0;
  overflow: hidden;
}

.right {
  right: 0;
}

.left {
  left: 0;
}

.circleProgress {
  width: 40px;
  height: 40px;
  border: 4px solid transparent;
  border-radius: 50%;
  position: absolute;
  top: 0;
}

.rightcircle {
  border-top: 4px solid #6e5b98;
  border-right: 4px solid #6e5b98;
  right: 0;
  transform: rotate(-135deg);
  display: none;
}

.leftcircle {
  border-bottom: 4px solid #6e5b98;
  border-left: 4px solid #6e5b98;
  left: 0;
  transform: rotate(-135deg);
  display: none;
}
.time-container {
  height: 100px;
}
.bar {
  width: 100%;
  height: 10px;
  line-height: 30px;

  .progressbar {
    width: 100%;
    height: 3px;
    background-color: #9e9e9e;
  }

  .greenbar {
    width: 0%;
    height: 3px;

    position: absolute;
    top: 0;
    left: 0;
    background-color: #6e5b98;

    .yuan {
      display: inline-block;
      padding: 4px; //控制按钮
      background-color: #6e5b98;
      border-radius: 50%;
      position: absolute;
      top: -2px;
      right: -5px;
    }
  }
}

.time-text {
  font-size: 15px;
  width: 50%;
  box-sizing: border-box;
  color: #757575;
  text-align: center;
}

.time-container {
  display: flex;
  justify-content: center;
  align-items: center;

  .v-list-item__icon {
    margin: 0;
  }
}

.audio-btn {
  width: 100%;
  text-align: center;
  .v-btn {
    width: 40px;
    height: 40px;
  }
  .v-btn-toggle {
    background-color: #6e5b98;
  }
}
.v-application--is-ltr .v-list-item__action:first-child, .v-application--is-ltr .v-list-item__icon:first-child{
  margin-right: 10px;
}
.v-list-item__action:last-of-type:not(:only-child), .v-list-item__avatar:last-of-type:not(:only-child), .v-list-item__icon:last-of-type:not(:only-child){
  margin-left: 10px;
}
</style>