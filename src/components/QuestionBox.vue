<template>
    <div class="question-box-container"> 
        <b-jumbotron>
            <template slot="lead">
            {{currentQuestion.question}}
            </template>

            <hr class="my-4">

            <div class="grid-2">
           <!-- <p v-for="(item,index) in answers" :key="index" v-on:click="detect(item)"> -->
            <p v-for="(item,index) in answers" :key="index" v-on:click.prevent="selectAnswer(index)" 
            :class="[selectedIndex === index ? 'seleted': '']">
                
               {{item}}
           </p>
           </div>

            <b-button variant="primary" v-on:click="submitAnswer" :disabled="selectedIndex == null || answered">Submit</b-button>
            <b-button @click="nextQuestion" variant="success" href="#">Next</b-button>
        </b-jumbotron>
    </div>
</template>

<script>
import _ from "lodash";
export default {
    props:{
        currentQuestion: Object,
        nextQuestion: Function,
        increment: Function,
    },
    computed :{
        answers() {
            let answers = [...this.currentQuestion.incorrect_answers];
            console.log(answers);
            answers.push(this.currentQuestion.correct_answer);
            return answers;
        },
    },
    methods : {
        selectAnswer(index) {
            console.log(index);
            this.selectedIndex = index ;
            console.log(this.selectedIndex);
        },
        shuffleAnswers(){
            let answers = [...this.currentQuestion.incorrect_answers,this.currentQuestion.correct_answer];
            this.shuffleAnswer = _.shuffle(answers);
            this.correctIndex = this.shuffleAnswer.indexOf(this.currentQuestion.correct_answer);
            console.log(this.shuffleAnswer);
            console.log("correctAnswer ::",this.correctIndex);
        },
        submitAnswer() {
            let isCorrect = false;
            if (this.selectedIndex == this.correctIndex) {
                isCorrect = true;
            }
            this.answered = true ;
            this.increment(isCorrect);
        },
    }, 
    watch: {
        currentQuestion: {
            immediate : true,
            handler() {
                this.selectedIndex = null
                this.shuffleAnswers(); 
            }
        }
    },
    mounted() {
        // console.log(this.currentQuestion);
        // console.log(this.nextQuestion);
    },
    data() {
        return {
            // total_correct_answer : 0,
            selectedIndex : null,
            shuffleAnswer: [],
            correctIndex : null,
            answered : false
        }
    }
}
</script>
<style lang="scss">
   .selected {
       background: #65a567
   }
   .correct {
       background:  lightblue;
   }
   .wrong {
        background: rgb(240, 61, 61);
   }
</style>