var webpack = require('webpack')
var path = require('path')
// 引入css 单独打包插件
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// html模板生成
var HtmlWebpackPlugin = require('html-webpack-plugin')

//定义模块相关配置
module.exports = {
	//定义入口
	entry: {
		//若有多入口可配置多个
		index: './src/login.js',
		//公共模块
		vendor: ['vue', 'vue-router', 'vuex', 'vue-resource', 'fastclick', 'mockjs']
	},
	//打包发布配置
	output: {
		//发布的目录
		path: path.join(__dirname, './dist'),
		//[name]变量指向 entry.*
		filename: '[name].js',
		//静态资源路径修改
		publicPath: './dist/'
	},
	//其他功能模块的配置
	module: {
		rules: [
			{
				//处理.vue后缀文件
				test: /.vue$/,
				loader: 'vue-loader',
				options: {
					//使用插件把 vue 组件中的 css 单独提取出来
					loader: {
						css: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'css-loader'
            }),
            less: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'less-loader']
            })
					}
				}
			},
			//处理css样式文件
			{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      //处理less样式文件
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      //处理图片压缩
      {
        test: /\.(png|jpg|gif|jpeg|eot|svg)$/,
        loader: 'url-loader',
        options: {
        	//当图片小于1M时进行转换
          limit: 1024,
          //定义转换后的图片名称的变更（防止存在用户缓存）
          name: 'images/[name].[hash:8].[ext]'
        },
      },
      //处理字体文件
      {
        test: /\.(ttf|woff|woff2|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: '../images/[name].[hash:8].[ext]'
        }
      },
      //ES6兼容转换器
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          // transforms: { dangerousForOf: true },
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
		]
	},
	//插件配置
	plugins: [
		//全局变量配置
		new webpack.ProvidePlugin({  // 全局变量
      $: 'jquery'
    }),
    //设置环境变量
		new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    //提取公共代码块
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
    // 设置生成css 的路径和文件名，会自动将对应entry入口js文件中引入的CSS抽出成单独的文件
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      // 设置模板所在的位置，这里如果是相对路径的话，则 ./ === __dirname
      template: path.join(__dirname, './src/') + 'index.template.html',
      // 设置文件名称以及文件生成的位置，这里如果是相对路径的话，则 ./ === output.path
      filename: path.join(__dirname, './') + 'login.html',
      showErrors: true,
      excludeChunks: ['login']
    }),
	],
	resolve: {
		//自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
		alias: {
      com: path.resolve(__dirname, './src/components/common'),
      c_views: path.resolve(__dirname, './src/views/common'),
      c_vendor: path.resolve(__dirname, './src/vendor/common'),

      //入口相关基础配置
      assets: path.resolve(__dirname, './src/assets/index'),
      com: path.resolve(__dirname, './src/components/index'),
      views: path.resolve(__dirname, './src/views/index'),
    }  
	}
}