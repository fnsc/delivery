<template>
	<div>
		Episode {{ movie.episode_id	 }} - {{ movie.title }}
	</div>
</template>
<script>
	const axios = require('axios');
	export default {
		data() {
			return {
				movie: {}
			}
		},
		methods: {
			fetch() {
				this.movie = {};
				axios.get(`https://swapi.co/api/films/${this.getCorrectId()}`)
					.then(({ data }) => {
						this.movie = data;
					})
			},
			getCorrectId() {
				return this.$route.params.url == 1 ? 4 :
					   this.$route.params.url == 2 ? 5 :
					   this.$route.params.url == 3 ? 6 :
					   this.$route.params.url == 4 ? 1 :
					   this.$route.params.url == 5 ? 2 :
					   this.$route.params.url == 6 ? 3 : this.$route.params.url;
			}
		},
		created() {
			this.fetch();
		}
	}
</script>
<style>
	div {
		color: #fff;
	}
</style>