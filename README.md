# 简介

> 在vue中创建多个ueditor实例,我使用neditor,其实就是把ueditor样式美化了下,其他和ueditor几乎一样

# 截图

<img src="https://raw.githubusercontent.com/oblivioussing/sacred/master/screen/vue-ueditor-multi/show.gif"/>

# 说明

下载ueditor或neditor源码,拷贝到static目录下面

<img src="https://raw.githubusercontent.com/oblivioussing/sacred/master/screen/vue-ueditor-multi/in-static.png"/>

然后修改ueditor.config.js配置文件

<img src="https://raw.githubusercontent.com/oblivioussing/sacred/master/screen/vue-ueditor-multi/config.png"/>

在vue项目的main.js添加ueditor引用

<img src="https://raw.githubusercontent.com/oblivioussing/sacred/master/screen/vue-ueditor-multi/vue-main.png"/>

新建3个页面 home,tab1,tab2。tab1和tab2是home下面的子页面

<img src="https://raw.githubusercontent.com/oblivioussing/sacred/master/screen/vue-ueditor-multi/vue-home.png"/>

在router-view外面一定要添加keep-alive组件和transition组件,不然ueditor实例无法保存

在components文件夹下面新建一个editor作为编辑器的公共组件

在tab1中调用editor,同时要传入一个id并在editor页面接受,注意如果需要多个实例,id一定不能相同

``` bash
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
```
editor页面代码,因为我们在router-view套用了keep-alive,所以ueditor的初始化一定要放在activated里面,
确保每次进入页面都会重新渲染ueditor,在deactivated里面调用ueditor的destroy方法,确保每次离开页面的时候
会销毁编辑器实例,这样就可以渲染多个ueditor实例了,并且每次切换都能保存编辑器的内容。

如果多个tab只需要一个实例请调用reset()方法

```bash
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
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
