<template>
    <div class="question-box-container"> 
        <b-jumbotron>
            <template slot="lead">
            {{currentQuestion.question}}
            </template>

            <hr class="my-4">

            <p>
            List of answer : 
            </p>
           <p v-for="(item,index) in answers" :key="index" v-on:click="detect">
               {{item}}
           </p>

            <b-button variant="primary"   href="#">Submit</b-button>
            <b-button @click="nextQuestion" variant="success" href="#">Next</b-button>
        </b-jumbotron>
    </div>
</template>

<script>
export default {
    props:{
        currentQuestion: Object,
        nextQuestion: Function,
        // detect: Function
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
        detect() {
             console.log("detected");
        }
    }, 
    mounted() {
        // console.log(this.currentQuestion);
        // console.log(this.nextQuestion);
    }
}
</script>
