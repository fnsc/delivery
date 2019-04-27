<template>
	<ul class="list-group">
		<router-link tag="li" class="list-group-item" :to="`/movie/${movie.episode_id}`" v-for="movie in movies" :key="movie.url">
			<a class="list-group--link" v-text="`Episode ${movie.episode_id} - ${movie.title}`"></a>
		</router-link>
	</ul>
</template>

<script>
	const axios = require('axios');
export default {
  name: 'home',
  data() {
  	return {
  		movies: []
  	}
  },
  methods: {
  	fetch() {
  		this.movies = [];
  		axios.get('https://swapi.co/api/films')
  			.then( ({ data }) => {
  				console.log(data)
  				this.movies = data.results
  			})
  	}
  },
  created() {
  	this.fetch();
  }
}
</script>
