<template>
	<nav>
		<ul class="pagination">
			<li class="page-item" :class="{disabled: paginate.previous == null}" @click="loadPage(paginate.previous)">
				<span class="page-link" href="#">Previous</span>
			</li>
			<li class="page-item" :class="{disabled: paginate.next == null}" @click="loadPage(paginate.next)">
				<a class="page-link" href="#">Next</a>
			</li>
		</ul>
	</nav>
</template>
<script>
	export default {
		props: ['paginate'],
		methods: {
			loadPage(page) {
				this.$emit('loadPage', page)
			}
		}
	}
</script>