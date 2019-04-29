<template v-cloak>
    <div class="container">
        <div class="row d-flex">
            <div class="col-lg-12">
                <nav class="navbar navbar-expand-lg navbar-dark">
                    <router-link to="/" class="navbar-brand"
                        ><img
                            src="../assets/star_wars_logo.png"
                            alt="Star Wars Logo"
                            class="image img-fluid"
                    /></router-link>
                    <button
                        class="navbar-toggler"
                        type="button"
                        id="menuButton"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div
                        class="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul class="navbar-nav mr-auto">
                            <router-link
                                tag="li"
                                :to="`/movie/${movie.episode_id}`"
                                v-for="movie in movies"
                                :key="movie.url"
                                class="nav-item"
                                @click.native="toggleMenu"
                            >
                                <a
                                    class="nav-link"
                                    v-text="`Episode ${movie.episode_id}`"
                                ></a>
                            </router-link>
                            <router-link tag="li" to="/search" class="nav-item"
                                @click.native="toggleMenu"><a class="nav-link">Pesquisa</a></router-link
                            >
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require("axios");
export default {
    name: "home",
    data() {
        return {
            movies: []
        };
    },
    methods: {
        fetchMovies() {
            this.movies = [];
            axios
                .get("https://swapi.co/api/films")
                .then(({ data }) => {
                    this.movies = data.results;
                })
                .catch(error => console.error(error));
        },
        toggleMenu(){
            let btn = document.querySelector('#menuButton');
            if (! btn.classList.contains('collapsed')) btn.click();
        }
    },
    created() {
        this.fetchMovies();
    }
};
</script>
<style lang="scss">
.image {
    height: 30px;
}
</style>
