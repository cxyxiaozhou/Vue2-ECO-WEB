<template>
  <div class="login">
    <van-nav-bar title="VipLogin" left-arrow @click-left="$router.go(-1)"/>
    <div class="container">
      <div class="title">
        <h3>Iphone Login</h3>
        <p>Unregisted is auto login</p>
      </div>
      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="please input number" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="please input Verification Code" type="text">
          <img @click="getPicCode" v-if="picUrl" :src="picUrl" alt="">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="please SMS verification code " type="text">
          <button @click="getCode">{{ second === totalSecond ? 'gets informations' : second + 'seconds is reloading' }}</button>
        </div>
      </div>
      <div @click="login" class="login-btn">Login</div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant'
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'
export default {
  name: 'LoginPage',
  data () {
    return {
      picCode: '',
      picKey: '',
      picUrl: '',
      totalSecond: 3,
      second: 3, // current seconds
      timer: null,
      mobile: '',
      msgCode: ''
    }
  },
  async created () {
    this.getPicCode()
  },
  methods: {
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64
      this.picKey = key
    },
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        Toast('please correct Verification Code')
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      console.log(res)
      this.$store.commit('user/setUserInfo', res.data)
      Toast('Login successful')
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    },
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        Toast('please correct number')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        Toast('please correct graphical')
        return false
      }
      return true
    },
    async getCode () {
      if (!this.validFn()) {
        return
      }
      // Automatically execute every 1 second--
      if (!this.timer && this.second === this.totalSecond) {
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        Toast('SMS Successful')
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
        Toast('get successful!')
      }
    },
    onClickLeft () {
      Toast('返回')
    },
    onClickRight () {
      Toast('按钮')
    }
  },
  // close page is trigger
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
   padding: 49px 29px;
.title {
  margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }
.form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex:1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }
    .login-btn {
      width: 100%;
      height: 42px;
      margin-top: 39px;
      background: linear-gradient(90deg,#ecb53c,#ff9211);
      color: #fff;
      border-radius: 39px;
      box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
      letter-spacing: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
  }
}
</style>
