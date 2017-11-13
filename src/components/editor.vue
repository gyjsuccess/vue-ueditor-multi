<template>
	<div>
		<div :id="this.id"></div>
	</div>
</template>

<script>
	export default {
		name: 'editor',
		props: ['id'],
		data() {
			return {
				ue: '', //ueditor实例
				content: '', //编辑器内容
			}
		},
		methods: {
			//初始化编辑器
			initEditor() {
				this.ue = UE.getEditor(this.id, {
					initialFrameWidth: '100%',
					initialFrameHeight: '350',
					scaleEnabled: true
				})
				//编辑器准备就绪后会触发该事件
				this.ue.addListener('ready',()=>{
					//设置可以编辑
					this.ue.setEnabled()
				})
				//编辑器内容修改时
				this.selectionchange()
			},
			//编辑器内容修改时
			selectionchange() {
				this.ue.addListener('selectionchange', () => {
					this.content = this.ue.getContent()
				})
			}
		},
		activated() {
			//初始化编辑器
			this.initEditor()
		},
		deactivated() {
			//销毁编辑器实例，使用textarea代替
			this.ue.destroy()
			//重置编辑器，可用来做多个tab使用同一个编辑器实例
			//如果要使用同一个实例,请注释destroy()方法
			//this.ue.reset()
		}
	}
</script>

<style>

</style>