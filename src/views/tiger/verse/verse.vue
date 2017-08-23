<template>
  <div>
    <div class="topInput">
      <span class="input input--kuro">
        <input v-model="verseData" class="input__field input__field--kuro" type="text" id="input-7" @keyup.enter="splitWords" />
        <label class="input__label input__label--kuro" for="input-7">
          <span class="input__label-content input__label-content--kuro">Please enter the verse</span>
        </label>
      </span>
    </div>
    <blockquote contenteditable="true">
      <q>{{ verseData }}</q>
      <cite>Jason Zhou</cite>
    </blockquote>
  </div>
</template>

<script>
export default {
  name: 'tigerVerse',
  data() {
    return {
      verseData: 'In me the tiger sniffs the rose.'
    }
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
      const quoteText = this.verseData.replace(/(<([^>]+)>)/ig, '');
      const quotewords = quoteText.split(' ');
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
<style scoped>
blockquote {
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

.topInput {
  margin-left: 38%
}


/* input */

.input {
  position: relative;
  z-index: 1;
  display: inline-block;
  margin: 1em;
  max-width: 400px;
  width: calc(100% - 2em);
  vertical-align: top;
}

.input__field {
  position: relative;
  display: block;
  float: right;
  padding: 0.8em;
  width: 60%;
  border: none;
  border-radius: 0;
  background: #f0f0f0;
  color: #aaa;
  font-weight: bold;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-appearance: none;
  /* for box shadows to show on iOS */
}

.input__field:focus {
  outline: none;
}

.input__label {
  display: inline-block;
  float: right;
  padding: 0 1em;
  width: 40%;
  color: #6a7989;
  font-weight: bold;
  font-size: 70.25%;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.input__label-content {
  position: relative;
  display: block;
  padding: 1.6em 0;
  width: 100%;
}

.graphic {
  position: absolute;
  top: 0;
  left: 0;
  fill: none;
}

.icon {
  color: #ddd;
  font-size: 150%;
}


/* Kuro */

.input--kuro {
  max-width: 320px;
  margin-bottom: 3em;
}

.input__field--kuro {
  width: 100%;
  margin-top: 1%;
  background: transparent;
  color: #9196A1;
  opacity: 0;
  text-align: center;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
}

.input__label--kuro {
  position: absolute;
  left: 0;
  width: 100%;
  color: #df6589;
  pointer-events: none;
}

.input__label--kuro::before,
.input__label--kuro::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  border: 4px solid #747981;
  -webkit-transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
}

.input__label--kuro::before {
  border-right: none;
}

.input__label--kuro::after {
  left: 50%;
  border-left: none;
}

.input__field--kuro:focus,
.input--filled .input__field--kuro {
  opacity: 1;
  -webkit-transition-delay: 0.3s;
  transition-delay: 0.3s;
}

.input__field--kuro:focus+.input__label--kuro::before,
.input--filled .input__label--kuro::before {
  -webkit-transform: translate3d(-10%, 0, 0);
  transform: translate3d(-10%, 0, 0);
}

.input__field--kuro:focus+.input__label--kuro::after,
.input--filled .input__label--kuro::after {
  -webkit-transform: translate3d(10%, 0, 0);
  transform: translate3d(10%, 0, 0);
}

.input__field--kuro:focus+.input__label--kuro .input__label-content--kuro,
.input--filled .input__label-content--kuro {
  -webkit-animation: anim-2 0.3s forwards;
  animation: anim-2 0.3s forwards;
}

@-webkit-keyframes anim-2 {
  50% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 1);
    transform: scale3d(0.3, 0.3, 1);
  }
  51% {
    opacity: 0;
    -webkit-transform: translate3d(0, 3.7em, 0) scale3d(0.3, 0.3, 1);
    transform: translate3d(0, 3.7em, 0) scale3d(0.3, 0.3, 1);
  }
  100% {
    opacity: 1;
    -webkit-transform: translate3d(0, 3.7em, 0);
    transform: translate3d(0, 3.7em, 0);
  }
}

@keyframes anim-2 {
  50% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 1);
    transform: scale3d(0.3, 0.3, 1);
  }
  51% {
    opacity: 0;
    -webkit-transform: translate3d(0, 3.7em, 0) scale3d(0.3, 0.3, 1);
    transform: translate3d(0, 3.7em, 0) scale3d(0.3, 0.3, 1);
  }
  100% {
    opacity: 1;
    -webkit-transform: translate3d(0, 3.7em, 0);
    transform: translate3d(0, 3.7em, 0);
  }
}
</style>

 
