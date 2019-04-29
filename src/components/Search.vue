<template>
	<div class="container">
		<div class="row mt-5">
			<div class="col-lg-12">
				<div class="card text-white bg-secondary mb-3">
					<div class="card-header">
						<h5 class="card-title">
							Encontre o que você precisa aqui
						</h5>
					</div>
					<div class="card-body">
						<div class="row">
							<div class="col-lg-12">
								<form>
									<div class="row">
										<div class="col-sm-12 col-lg-3 mt-2">
											<select
												name="search"
												id="search"
												class="form-control"
												v-model="search"
											>
												<option value=""
													>Escolha um parametro de
													busca</option
												>
												<option value="people"
													>Personagens</option
												>
												<option value="planets"
													>Planetas</option
												>
												<option value="species"
													>Espécies</option
												>
											</select>
											<span
												class="text-warning"
												v-text="`Campo obrigatório`"
												v-if="errors.search"
											></span>
										</div>
										<div class="col-sm-12 col-lg-3 mt-2">
											<input
												type="text"
												id="parametro"
												class="form-control"
												v-model="params"
												placeholder="Luke Skywalker"
											/>
											<span
												class="text-warning"
												v-text="`Campo obrigatório`"
												v-if="errors.params"
											></span>
										</div>
										<div class="col-sm-12 col-lg-3 mt-2">
											<button
												class="btn btn-dark"
												v-text="`Buscar`"
												@click.prevent="proceed"
												:disabled="clicked"
											></button>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div v-if="!clicked">
							<div class="row mt-3" v-if="results.length">
								<div class="col-lg-12">
									<data-list :results="results"></data-list>
								</div>
								<div class="col-lg-12">
									<paginator
										:paginate="paginate"
										@loadPage="loadNewPage($event)"
									></paginator>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<loading v-if="clicked"></loading>
	</div>
</template>
<script>
const axios = require("axios");
const swal = require("sweetalert");
import DataList from "./Table";
import Paginator from "./Paginator";
import Loading from "./Loading";
export default {
	components: {
		Paginator,
		DataList,
		Loading
	},
	data() {
		return {
			search: "",
			params: "",
			errors: {
				search: false,
				params: false
			},
			clicked: false,
			results: [],
			paginate: {
				next: null,
				previous: null
			}
		};
	},
	methods: {
		proceed() {
			this.results = [];
			if (this.validate()) return false;
			this.clicked = true;
			axios
				.get(
					`https://swapi.co/api/${this.search}?search=${this.params}`
				)
				.then(({ data }) => {
					if (!data.results.length) {
						swal(
							"Ops... 😭",
							"Não encontramos nada com o dado informado...",
							"error"
						);
					}
					this.results = data.results;
					this.paginate.next = data.next;
					this.paginate.previous = data.previous;
					this.clicked = false;
				})
				.catch(error => {
					swal(
						"Ops... 😭",
						"Houve um erro ao realizar a pesquisa. Tente novamente mais tarde.",
						"error"
					);
					this.clicked = false;
					console.error(error.response.data);
				});
		},
		validate() {
			if (this.search == "" && this.params == "") {
				this.errors.search = true;
				this.errors.params = true;
				setTimeout(() => {
					this.errors.params = false;
					this.errors.search = false;
				}, 5000);
				return true;
			} else if (this.params == "") {
				this.errors.params = true;
				setTimeout(() => {
					this.errors.params = false;
				}, 5000);
				return true;
			} else if (this.search == "") {
				this.errors.search = true;
				setTimeout(() => {
					this.errors.search = false;
				}, 5000);
				return true;
			}
			return false;
		},
		loadNewPage($event) {
			this.clicked = true;
			this.results = [];
			axios
				.get($event)
				.then(({ data }) => {
					this.results = data.results;
					this.paginate.next = data.next;
					this.paginate.previous = data.previous;
					this.clicked = false;
				})
				.catch(error => {
					swal(
						"Ops... 😭",
						"Houve um erro ao realizar a busca.",
						"error"
					);
					this.clicked = false;
					console.error(error.response.data);
				});
		}
	}
};
</script>
