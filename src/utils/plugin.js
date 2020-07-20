// 这是一个基于Vue的插件，拓展vue功能（组件，指令，过滤器，原型属性...）
import MyBread from "@/components/my-bread";

export default {  // 导出的是一个对象
    install(Vue) {  // 属性是一个函数，有固定参数
        // vue 是构造函数（将来在main.js使用Vue.use()安装插件传入进来的）
        Vue.component(MyBread.name, MyBread);
    }
}