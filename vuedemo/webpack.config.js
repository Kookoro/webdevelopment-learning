// 这是一个配置文件，起始就是一个JS文件，通过Node中的模块操作，向外暴露了一个 配置对象
const path = require('path');
const webpack = require('webpack') //启用热更新第二步

//导入html-weback-plugin插件 在内存中生存html页面的插件
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

//这个插件的两个作用
//1.自动在内存中根据指定页面生成内存中页面
//2.自动把打包好的bundle.js追加到页面中去 
module.exports = {

    //在配置文件中需要手动指定入口与出口

    entry: {
        entry: './src/main.js'
    }, //指定打包文件
    output: {
        path: path.resolve(__dirname, 'dist'), //指定打包输入文件
        filename: 'bundle.js'
    },
    devServer: {
        //这是配置dev-server 命令参数的第二种形式，此方式相对麻烦些
        open: true, //自动打开浏览器
        port: 8080, //设置启动时运行端口 
        //指定托管的根目录
        hot: true, //启用热更新第一步 
        publicPath: '/',
        proxy: {
            '/api': {
                target: "https://uploadbeta.com", // 需要跨域访问的地址
                changeOrigin: true, // 必须要加，否则访问的是自己
                secure: false
            },  
            '/random': {
                target: "https://source.unsplash.com", // 需要跨域访问的地址
                changeOrigin: true, // 必须要加，否则访问的是自己
                secure: false 
            },  
            '/1920': {
                target: "https://picsum.photos", // 需要跨域访问的地址
                changeOrigin: true, // 必须要加，否则访问的是自己
                secure: false 
            },  
            '/picture': {
                target: "https://sotama.cool", // 需要跨域访问的地址
                changeOrigin: true, // 必须要加，否则访问的是自己
                secure: false
            },  
 
        },    
 
    },  
    plugins: [
        //配置插件的节点
        new webpack.HotModuleReplacementPlugin(), //new一个热更新的模块对象，这是启用热跟新的第三步
        new htmlWebpackPlugin({
            //创建一个在内存中生成html页面的插件
            //htmlWebpackPlugin
            template: path.join(__dirname, './src/index.html'), //指定模板页面，将来根据路径生成指定的内存中的模板页面
            filename: 'index.html'
        }),
        new VueLoaderPlugin(),

    ],
    module: {
        //这个节点，用于配置所有第三方模块加载器
        rules: [ //所有第三方模块的匹配规则
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            fiber: require('fibers'),
                            indentedSyntax: true // optional
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }]
            },
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: ['url-loader?limit=8294454&name=[name].[ext]','img-loader'],//处理图片路径的loader ?后传参 limit
                //limit 给定的值是图片的大小 单位byte，如果图片大小大于或等于给定的limit值则不会被转换为base64格式的字符串，反之
                //name
                    
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader'
            },
            {
                test: /\/.js$/,
                use: 'babel-loader',
                exclude: /node_modules/ //排除node_modules中的文件
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }


        ]
    },
    resolve: {
        alias: {
            "vue$": 'vue/dist/vue.js'
        }
    }



}
// 当在控制台直接输入webpack命令时 webpack做了以下几个步骤
//1. 首先 webpack 发现并没有通过命令的形式指定入口与出口
//2. webpack会在项目中 寻找一个名为 wepack.config.js的配置文件
//3. webpack会去解析和执行这个配置文件，当解析执行完配置文件后，就得到了配置文件中导出的配置对象
//4. 当webpack拿到配置对象时，即拿到配置对象中指定的入口和出口，然后进行打包构建


//使用webpack-dev-server工具实现自动打包功能 安装到项目的本地依赖
//安装完毕后，这个工具的用法，与webpack命令的用法，完全一样
//由于webpack-dev-server是于本地项目中安装的，故无法将其当作脚本命令，在powershell终端中直接运行
//dev-server帮我们打包生成的bundle.js并未存放在本地物理磁盘中，而是存放在内存中，故找不到bundle.js