<template>
	<div>
		<div class="body" id="body" @click="showDiv" v-if="show">
			<div class="fade"></div>
			<section class="star-wars">
				<div class="crawl">
					<div class="title">
						<p>{{ episodeNumber }}</p>
						<h1>{{ movie.title }}</h1>
					</div>
					<p v-text="movie.opening_crawl"></p>
				</div>
			</section>
		</div>
		<section class="content row justify-content-center">
			<div class="col-lg-8">
				<h2>{{ episodeNumber }} - {{ movie.title }}</h2>
			</div>
		</section>
	</div>
</template>
<script>
	const axios = require('axios');
	export default {
		data() {
			return {
				movie: {},
				show: true,
			}
		},
		computed: {
			episodeNumber() {
				return this.movie.episode_id == 1 ? 'Episode IV' :
					   this.movie.episode_id == 2 ? 'Episode V' :
					   this.movie.episode_id == 3 ? 'Episode VI' :
					   this.movie.episode_id == 4 ? 'Episode I' :
					   this.movie.episode_id == 5 ? 'Episode II' :
					   this.movie.episode_id == 6 ? 'Episode III' :
					   this.movie.episode_id == 7 ? 'Episode VII' : '';
			}
		},
		methods: {
			fetch() {
				this.movie = {};
				axios.get(`https://swapi.co/api/films/${this.getCorrectId()}`)
				.then(({ data }) => {
					console.log(data);
					this.movie = data;
				})
			},
			getCorrectId() {
				return this.$route.params.id == 1 ? 4 :
					   this.$route.params.id == 2 ? 5 :
					   this.$route.params.id == 3 ? 6 :
					   this.$route.params.id == 4 ? 1 :
					   this.$route.params.id == 5 ? 2 :
					   this.$route.params.id == 6 ? 3 : this.$route.params.id;
			},
			showDiv(){
				this.show = false;
			}
		},
		created() {
			this.fetch();
			setTimeout(() => {
				document.getElementById('body').style.display = 'none';
			}, 60000);
		}
	}
</script>
<style lang="scss">
.body {
	width: 100%;
	height: 100%;
	overflow: hidden;
	animation: show 60s;
	color: #fff;
	cursor: pointer;
}
.fade {
	position: relative;
	width: 100%;
	min-height: 60vh;
	top: -25px;
	background-image: linear-gradient(0deg, transparent, black 75%);
	z-index: 1;
}

.star-wars {
	display: flex;
	justify-content: center;
	position: relative;
	height: 400px;
	color: #feda4a;
	font-family: 'Pathway Gothic One', sans-serif;
	font-size: 500%;
	font-weight: 600;
	letter-spacing: 6px;
	line-height: 150%;
	perspective: 400px;
	text-align: justify;
}

.crawl {
	position: relative;
	top: 99999px;
	white-space: pre;
	word-wrap: break-word;
	text-align: justify;
	transform-origin: 50% 100%;
	animation: crawl 60s linear 1s;
}

.crawl > .title {
	font-size: 90%;
	text-align: center;
}

.crawl > .title h1 {
	margin: 0 0 100px;
	text-transform: uppercase;
}

@keyframes crawl {
	0% {
		top: -100px;
		transform: rotateX(20deg)  translateZ(0);
	}
	100% {
		top: -6000px;
		transform: rotateX(25deg) translateZ(-2500px);
	}
}

.content {
	& h2 {
		color: #feda4a;
		font-weight: bold;
		text-align: center;
	}
	color: #f1f1f1;
}
</style>