<template>
  <div class="login-container">
    <van-nav-bar title="标题" />
    <div class="login-content">
      <div>
        <ValidationObserver ref="myForm">
          <ValidationProvider name="手机号" rules="required|mobile">
            <van-field
              required
              left-icon="phone-o"
              label="手机号"
              v-model="user.mobile"
              placeholder="请输入手机号"
            />
          </ValidationProvider>
          <ValidationProvider name="验证码" rules="required|code">
            <van-field
              left-icon=" iconfont icon-yanzhengma"
              required
              label="验证码"
              type="password"
              clearable
              v-model="user.code"
              placeholder="请输入验证码"
            >
              <van-count-down
                slot="button"
                v-if="isShowTime"
                :time="1000*6"
                @finish="isShowTime=false"
                format="ss 秒"
              />
              <van-button
                class="get-code"
                slot="button"
                type="primary"
                v-else
                @click="onSendSmsCode"
                size="small"
              >获取验证码</van-button>
            </van-field>
          </ValidationProvider>
        </ValidationObserver>
        <van-button
          class="get-login"
          type="info"
          :loading="loadingLogin"
          loading-text="登录中..."
          @click="loginUser"
        >登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
import { validate } from 'vee-validate'
export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      loadingLogin: false,
      isShowTime: false
    }
  },
  methods: {
    async loginUser () {
      // 登录时的表单验证
      const success = await this.$refs.myForm.validate()
      if (!success) {
        console.log(success)
        const { errors } = await this.$refs.myForm
        const item = Object.values(errors).find(item => item[0])
        this.$toast(item[0])
        return
      }

      try {
        this.loadingLogin = true
        this.$toast.loading({
          type: 'loading',
          message: '登陆中....',
          duration: 0
        })

        const result = await login(this.user)
        this.loadingLogin = false
        this.$store.commit('setUser', result.data)
        this.$toast.success('登录成功')
        // const token = result.data.token
        // window.localStorage.setItem('user-token', token)
        this.$router.push('/home')
      } catch (error) {
        console.log('登录失败' + error)
        this.$toast.fail('登录失败')
        this.loadingLogin = false
      }
    },
    async onSendSmsCode () {
      const { mobile } = this.user
      const { valid, errors } = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      if (!valid) {
        this.$toast(errors[0])
        return
      }
      try {
        this.isShowTime = true
        await getSmsCode(mobile)
      } catch (error) {
        this.isShowTime = false
        if (error.response.status === 429) {
          this.$toast('请勿频繁发送')
          return
        }
        this.$toast('请求失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.login-container {
  background-color: #f5f7f9;
  height: 100vh;
  .login-content {
    height: 70%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .van-field {
      background-color: #fff;
      .get-code {
        background-color: #ededed;
        color: #000;
        border: none;
        border-radius: 6px;
      }
    }
    .get-login {
      width: 345px;
      margin-left: 16px;
      margin-top: 26px;
      border-radius: 8px;
    }
  }
}
</style>
