const { createApp } = Vue

createApp({
    data() {
        return {
            countryInfos: [],
            userInput: "",
            score: 0,
            gameOver: false,
            shake: false,
            correct: false
        }
    },
    methods: {
        randCountry() {
            axios.get("./countries.json").then(response => (this.countryInfos = response.data[Math.floor(Math.random() * 250)]))
        },
        seeAnswer() {
            this.gameOver = true
        },
        restart() {
            this.gameOver = false
            this.score = 0
            this.userInput = ""
            this.randCountry()
        },
        enterPressed() {
            if (this.userInput.toLowerCase() == this.answer.toLowerCase()) {
                this.userInput = ""
                this.correct = true
                this.score++
                this.randCountry()
            } else {
                this.shake = true
            }
        }
    },
    computed: {
        flagURL: function () {
            return "https://flagcdn.com/" + `${this.countryInfos.alpha2}`.toLowerCase() + ".svg"
        },
        answer: function () {
            console.log(this.language)
            if (this.language == "ja") {
                return this.countryInfos.countryJA
            } else if (this.language == "en") {
                return this.countryInfos.countryEN
            } else {
                return this.countryInfos.countryJA
            }
        },
        language: function () {
            return document.head.querySelector('[name=language]').content
        }
    },
    mounted: function () {
        this.randCountry()
    },
    watch: {
        userInput: function (userInput) {
            this.userInput = userInput
            this.shake = false
        }
    }
}).mount("#app")
