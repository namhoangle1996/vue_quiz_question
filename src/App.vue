<template>
  <div id="app">
      <Header/>
      <b-container class="bv-example-row">
        <b-row>
          <b-col sm="6" ><QuestionBox 
              v-if="questions.length"
              :currentQuestion="questions[index]"  
              :nextQuestion ="nextQuestion"
          /></b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import QuestionBox from './components/QuestionBox.vue'
import axios from "axios";
// import morgan from "morgan";




export default {
  name: 'app',
  components: {
    Header,
    QuestionBox
  },
  data() {
      return {
        questions:[],
        index: 0
      }
  },
  methods: {
    nextQuestion() {
      this.index++;
      // console.log(this.index);
      // console.log(this.questions.length);
      // if (this.index == this.questions.length) {
      //   this.index
      //   console.log('maxed');
      // }
    },
    prevQuestion() {
      this.index--
    }
  },
  mounted: function(){
    axios.get('https://opentdb.com/api.php?amount=10&category=27&type=multiple')
    .then(function(res){
        return res.data.results;
    })
    .then((jsonData)=>{
        this.questions = jsonData ;
        // console.log(this.questions[0]);
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
