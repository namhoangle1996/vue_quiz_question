<template>
    <div class="question-box-container"> 
        <b-jumbotron>
            <template slot="lead" >
            {{ currentQuestion.question }}
            </template>

            <hr class="my-4">

            <div class="grid-2">
           <!-- <p v-for="(item,index) in answers" :key="index" v-on:click="detect(item)"> -->
            <p v-for="(item,index) in answers" :key="index" @click.prevent="selectAnswer(index)" 
                :class="answerClass(index)"
            >
                
               {{ item | capitalize }}
           </p>
           </div>
           <li v-for="n in even(numbers)" v-bind:key="n">{{ n }}</li>


            <b-button variant="primary" v-on:click="submitAnswer" :disabled="selectedIndex === null || answered ">Submit</b-button>
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
            // console.log(index);
            this.selectedIndex = index ;
            // console.log(this.selectedIndex);
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
            if (this.selectedIndex === this.correctIndex) {
                isCorrect = true;
            }
            else {
                alert("wrong answer");
            }
            this.answered = true ;
            this.increment(isCorrect);
            // console.log(this.answered,thcapitalizeis.selectedIndex);
        },
        answerClass(index) {
            let answerClass = '' ;
            if (!this.answered && this.selectedIndex === index) {
                answerClass = 'selected'
            } else if (this.answered && this.correctIndex === index) {
                answerClass = 'correct'
            } else if (this.answered &&
                this.selectedIndex === index &&
                this.correctIndex !== index
            ) {
                answerClass = 'incorrect'
            }
            return answerClass
            },
          even: function (numbers) {
            return numbers.filter(number => number % 2 === 1 )}    
        }, 
        watch: {
            currentQuestion: {
                immediate : true,
                handler() {
                    this.selectedIndex = null
                    this.shuffleAnswers(); 
                    this.answered = false;
                }
        }
    },
    mounted() {
        console.log("current question",this.currentQuestion);
        // console.log(this.nextQuestion);
    },
    data() {
        return {
            // total_correct_answer : 0,
            selectedIndex : null,
            shuffleAnswer: [],
            correctIndex : null,
            answered : false,
            numbers: [ 1, 2, 3, 4, 5 ]
        }
    },
    filters: {
        capitalize: function(value) {
            return value.toUpperCase();
        }
    }
}
</script>
<style lang="scss">
   .selected {
       background: #65a567 !important ;
   }
   .correct {
       background:  lightblue !important;
   }
   .incorrect {
        background: rgb(240, 61, 61) !important;
   }
</style>