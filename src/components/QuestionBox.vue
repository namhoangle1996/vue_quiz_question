<template>
    <div class="question-box-container"> 
        <b-jumbotron>
            <template slot="lead">
            {{currentQuestion.question}}
            </template>

            <hr class="my-4">

            <p>
            List of answer  
            </p>

            <b-button variant="primary" href="#">Submit</b-button>
            <b-button @click="nextQuestion" variant="success" href="#">Next</b-button>
        </b-jumbotron>
    </div>
</template>

<script>
export default {
    props:{
        currentQuestion: Object,
        nextQuestion: Function,
    },
    computed :{
        answers() {
            let answers = [...currentQuestion.incorrect_answers];
            console.log(answers);
        }
    }, 
    mounted() {
        // console.log(this.currentQuestion);
        // console.log(this.nextQuestion);
    }
}
</script>
