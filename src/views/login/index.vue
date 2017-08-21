<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
      <blockquote contenteditable="true">
        <q>In me the tiger sniffs the rose.</q>
        <cite>Jason Zhou</cite>
      </blockquote>
      <h2 class="title">Colourdata Platform</h2>
      <el-form-item prop="email">
        <span class="svg-container">
          <icon-svg icon-class="jiedianyoujian"></icon-svg>
        </span>
        <el-input name="email" type="text" v-model="loginForm.email" autoComplete="on" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <icon-svg icon-class="mima"></icon-svg>
        </span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" v-waves :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
  
    </el-form>
  
    <el-dialog title="第三方验证" :visible.sync="showDialog">
      邮箱登录成功,请选择第三方验证
      <social-sign></social-sign>
    </el-dialog>
  
  </div>
</template>

<script>
import { isWscnEmail } from 'utils/validate';
import socialSign from './socialsignin';

export default {
  components: { socialSign },
  name: 'login',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!isWscnEmail(value)) {
        callback(new Error('请输入正确的合法邮箱'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        email: 'admin@wallstreetcn.com',
        password: ''
      },
      loginRules: {
        email: [
          { required: true, trigger: 'blur', validator: validateEmail }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ]
      },
      loading: false,
      showDialog: false
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan);
  },
  mounted() {
    this.splitWords();
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan);
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('LoginByEmail', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({ path: '/' });
            // this.showDialog = true;
          }).catch(() => {
            this.loading = false;
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    splitWords() {
      const quote = document.querySelector('blockquote q');
      quote.innerText.replace(/(<([^>]+)>)/ig, '');
      const quotewords = quote.innerText.split(' ');
      const wordCount = quotewords.length;
      quote.innerHTML = '';
      for (let i = 0; i < wordCount; i++) {
        quote.innerHTML += '<span>' + quotewords[i] + '</span>';
        if (i < quotewords.length - 1) {
          quote.innerHTML += ' ';
        }
      }
      const quoteword = document.querySelectorAll('blockquote q span');
      this.fadeWords(quoteword);
    },
    getRandom(min, max) {
      return Math.random() * (max - min) + min;
    },
    fadeWords(quotewords) {
      Array.prototype.forEach.call(quotewords, word => {
        word.animate([{
          opacity: 0,
          filter: 'blur(' + this.getRandom(2, 5) + 'px)'
        }, {
          opacity: 1,
          filter: 'blur(0px)'
        }],
          {
            duration: 1000,
            delay: this.getRandom(500, 3300),
            fill: 'forwards'
          }
        )
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 5px;
}

.login-container {
  @include relative;
  height: 100vh;
  background-color: #333333;
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: #eeeeee;
    height: 47px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: #eeeeee;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .forget-pwd {
    color: #fff;
  }
  blockquote {
    width: 230%;
    margin-top: -20%;
    margin-left: -60%;
    background-color: #333333;
    font-size: 3rem;
  }
  cite {
    display: block;
    text-align: right;
    font-family: Verdana, Arial, sans-serif;
    margin-top: 1rem;
    font-size: .9rem;
    color: #aaa;
    font-style: normal;
  }
  blockquote q {
    font-family: Georgia, serif;
    font-style: italic;
    color: #DC143C;
    letter-spacing: .1rem;
  }
  blockquote q span {
    will-change: opacity, filter;
    opacity: 0;
    filter: blur(0px);
  }
  q {
    quotes: '“' '”' '‘' '’';
  }
  q:before {
    content: open-quote;
    margin-right: .8rem;
  }
  q:after {
    content: close-quote;
  }
  q:before,
  q:after {
    color: #ccc;
    font-size: 4rem;
  }
}
</style>
