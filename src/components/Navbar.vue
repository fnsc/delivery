<template v-cloak>
    <nav class="navbar navbar-expand-lg navbar-dark">
        <router-link to="/" class="navbar-brand"><img src="../assets/star_wars_logo.png" alt="Star Wars Logo" class="image img-fluid"></router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <router-link tag='li' :to="`/movie/${movie.episode_id}`" v-for="movie in movies" :key="movie.url" class="nav-item">
                    <a class="nav-link" v-text="`Episode ${movie.episode_id}`"></a>
                </router-link>
            </ul>
        </div>
    </nav>
</template>

<script>
    const axios = require("axios");
    export default {
        name: "home",
        data() {
            return {
                movies: [],
                carachters: [],
                planets: [],
                starships: [],
                vehicles: [],
                search: '',
            };
        },
        methods: {
            fetchMovies() {
                this.movies = [];
                axios.get("https://swapi.co/api/films")
                .then(({ data }) => {
                    console.log(data);
                    this.movies = data.results;
                })
                .catch(error => console.error(error));
            },
            fetchCarachters() {
                this.carachters = [];
                axios.get('https://swapi.co/api/people')
                .then(({ data }) => {
                    console.log(data);
                    this.carachters = data.results;
                })
                .catch(error => console.error(error))
            },
            fetchStarships() {
                this.starships = [];
                axios.get('https://swapi.co/api/starships')
                .then(({ data }) => {
                    console.log(data);
                    this.starships = data.results;
                })
                .catch(error => console.error(error))
            },
            fetchPlanets() {
                this.planets = [];
                axios.get('https://swapi.co/api/planets')
                .then(({ data }) => {
                    console.log(data);
                    this.planets = data.results;
                })
                .catch(error => console.error(error))
            },
            fetchVehicles() {
                this.vehicles = [];
                axios.get('https://swapi.co/api/vehicles')
                .then(({ data }) => {
                    console.log(data);
                    this.vehicles = data.results;
                })
                .catch(error => console.error(error))
            },
        },
        created() {
            this.fetchMovies();
            this.fetchCarachters();
            this.fetchPlanets();
            this.fetchVehicles();
            this.fetchStarships();
        }
    };
</script>
<style lang="scss">
li a {

}

.image {
    height: 30px;
}
</style>
