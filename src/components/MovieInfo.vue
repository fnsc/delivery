<template>
	<section class="content" v-cloak>
		<div v-if="! loading">
			<div class="row justify-content-center">
				<div class="col-lg-8">
					<h2>{{ episodeNumber }} - {{ movie.title }}</h2>
				</div>
			</div>
			<div class="row mt-2">
				<div class="col-sm-12 col-lg-4 mt-3">
					<span>Lançamento: </span><span v-text="releaseDate"></span>
				</div>
				<div class="col-sm-12 col-lg-4 mt-3">
					<span>Diretor: </span><span v-text="movie.director"></span>
				</div>
				<div class="col-sm-12 col-lg-4 mt-3">
					<span>Produtor: </span><span v-text="movie.producer"></span>
				</div>
			</div>
			<div class="row mt-2">
				<div class="col-sm-12 col-lg-6 mt-3">
					<img :src="getImgUrl(movie.episode_id)" :alt="`Cover Episode ${movie.episode_id}`" class="cover">
				</div>
				<div class="col-sm-12 col-lg-6 mt-3">
					<span v-text="movie.opening_crawl" class="lore"></span>
				</div>
			</div>
			<!-- <div class="row mt-2">
				<div class="col-sm-12 col-lg-4 mt-3">
					<span>Planetas: </span>
					<ul class="planets--list">
						<li class="planets--item" v-for="planet in planets" v-text="planet.name"></li>
					</ul>
				</div>
				<div class="col-sm-12 col-lg-4 mt-3">
					<span>Personagens: </span>
					<ul class="carachters--list">
						<li class="carachters--item" v-for="carachter in carachters" v-text="carachter.name"></li>
					</ul>
				</div>
			</div> -->
		</div>
		<div class="row" v-if="loading">
			<div class="col-lg-12 ">
				<img src="../assets/loading.gif" alt="loading" class="mx-auto d-block">
			</div>
		</div>
	</section>
</template>
<script>
	const axios = require("axios");
	const moment = require('moment');
	export default {
		data() {
			return {
				movie: {},
				planets: [],
				carachters: [],
				loading: false,
			};
		},
		computed: {
			episodeNumber() {
				return this.movie.episode_id == 1
				? "Episode I"
				: this.movie.episode_id == 2
				? "Episode II"
				: this.movie.episode_id == 3
				? "Episode III"
				: this.movie.episode_id == 4
				? "Episode IV"
				: this.movie.episode_id == 5
				? "Episode V"
				: this.movie.episode_id == 6
				? "Episode VI"
				: this.movie.episode_id == 7
				? "Episode VII"
				: "";
			},
			releaseDate() {
				return this.movie.release_date ? moment(this.movie.release_date).format('DD/MM/YYYY') : '';
			}
		},
		watch: {
			$route(to, from) {
				this.fetch();
			}
		},
		methods: {
			fetch() {
				this.loading = true;
				this.movie = {};
				this.planets = [];
				this.carachters = [];
				axios
				.get(`https://swapi.co/api/films/${this.getCorrectId()}`)
				.then(({ data }) => {
					console.log(data);
					this.movie = data;
					this.movie.planets.forEach(planet => {
						this.fetchPlanets(planet);
					});
					this.movie.characters.forEach(carachter => {
						this.fetchCarachters(carachter);
					});
					this.loading = false;
				});
			},
			getCorrectId() {
				return this.$route.params.id == 1
				? 4
				: this.$route.params.id == 2
				? 5
				: this.$route.params.id == 3
				? 6
				: this.$route.params.id == 4
				? 1
				: this.$route.params.id == 5
				? 2
				: this.$route.params.id == 6
				? 3
				: this.$route.params.id;
			},
			showDiv() {
				this.show = false;
			},
			getImgUrl(pic) {
				const images = require.context('../assets/', false, /\.jpeg$/)
				return images('./episode_' + pic + ".jpeg")
			},
			fetchPlanets(planet) {
				axios.get(planet)
					.then(({ data }) => {
						this.planets.push(data);
					})
			},
			fetchCarachters(carachter) {
				axios.get(carachter)
					.then(({ data }) => {
						this.carachters.push(data);
					})
			}
		},
		created() {
			this.fetch();
	}
};
</script>
<style lang="scss">
.content {
	color: #f1f1f1;
	font-weight: bold;
	text-transform: uppercase;
	& h2 {
		text-align: center;
		color: #feda4a;
	}
}

.cover {
	width: 100%
}
</style>
