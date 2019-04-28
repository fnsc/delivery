<template>
	<table class="table table-dark">
		<thead>
			<tr>
				<th
					scope="col"
					v-for="(value, prop) in results[0]"
					v-text="prop.replace('_', ' ').toUpperCase()"
					v-if="!checkField(value, prop)"
				></th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="result in results">
				<td
					v-for="(value, prop) in result"
					v-text="value"
					v-if="!checkField(value, prop)"
				></td>
			</tr>
		</tbody>
	</table>
</template>
<script>
export default {
	props: ["results"],
	methods: {
		checkField(value, prop) {
			if (Array.isArray(value)) {
				return true;
			} else if (prop == "created" || prop == "edited" || prop == "url") {
				return true;
			} else if (value.includes("https:")) {
				return true;
			}
		}
	}
};
</script>
