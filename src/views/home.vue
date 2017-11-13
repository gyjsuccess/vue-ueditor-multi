<template>
	<div>
		<div class="center">
			<button @click="tab1">ueditor实例1</button>
			<button @click="tab2">ueditor实例2</button>
		</div>
		<transition name="fade">
			<keep-alive>
				<router-view class="m-t-10"></router-view>
			</keep-alive>
		</transition>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			tab1() {
				this.$router.push('/')
			},
			tab2() {
				this.$router.push('/tab2')
			}
		}
	}
</script>

<style>
	.center{
		text-align: center;
	}
	.m-t-10 {
		margin-top: 10px;
	}
</style>