<template>
  <div id="app">
      <Header :numCorrect="numCorrect" :numTotal="numTotal" 
      />
      <b-container class="bv-example-row">
        <b-row>
          <b-col sm="6" >
            <QuestionBox 
               v-if="questions.length"
              :currentQuestion="questions[index]"  
              :nextQuestion ="nextQuestion"
              :increment ="increment"
            />
          </b-col>
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
        questions: [],
        index: 0,
        numCorrect:0,
        numTotal : 0
      }
  },
  methods: {
    nextQuestion() {
      this.index++;
      if (this.index == this.questions.length) {
          console.log("maxium questions");
          this.index-- ;
      }
      
    },
    increment(isCorrect) {
      if(isCorrect) {
        this.numCorrect++
      }
      this.numTotal++;
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
        // console.log(this.questions.lengt h);
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.question-box-container {
   .jumbotron {
     .grid-2 {
        display: grid;
        grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
        justify-content: center;
        align-items: center;
        p {
          background: #c9d4de;
          padding: 10px;
          color: white;
          font-weight: bold;
          transition: all 0.3s ease-out;
          &:hover {
            background: #65a567;
            cursor: pointer;
          }
        }
     }
   }
}
</style>
