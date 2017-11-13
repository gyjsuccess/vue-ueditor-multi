<template>
	<div>
		<editor ref="editor" id="tab1Editor"></editor>
		<button @click="getContent" class="m-t-10">获取内容</button>
		<div>
			<span>当前富文本编辑器内容是: {{content}}</span>
		</div>
	</div>
</template>

<script>
	import Editor from '@/components/editor'
	export default {
		name: 'tab1',
		components: { Editor },
		data() {
			return {
				content:''
			}
		},
		methods: {
			//获取内容
			getContent(){
				this.content = this.$refs.editor.content
			}
		}
	}
</script>

<style scoped>
	.m-t-10{
		margin-top: 10px;
	}
</style>