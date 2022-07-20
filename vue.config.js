const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  /*
    Vue-cli3:
    Crashed when using Webpack `import()` #2463
    https://github.com/vuejs/vue-cli/issues/2463
   */
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,

  //打包app时放开该配置
  // publicPath: './',
  configureWebpack: config => {
    //生产环境取消 console.log
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))
      .set('@mobile', resolve('src/modules/mobile'))

    //生产环境，开启js\css压缩
    if (process.env.NODE_ENV === 'production') {


      config.plugin('TerserPlugin').use(new TerserPlugin({
        test: new RegExp('\\.(' + ['js'].join('|') + ')$'),
        terserOptions: {
          compress: {
            arguments: true,
            dead_code: true
          },
          toplevel: true,
          keep_classnames: true,
          keep_fnames: true

        }
      }))
    }

    // 配置 webpack 识别 markdown 为普通的文件
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use()
      .loader('file-loader')
      .end()
  },

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            rootValue: 20, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
            propList: ['*'],
            unitPrecision: 5, //允许REM单位增长到的十进制数字。
            propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
            propBlackList: [], //黑名单
            exclude: false,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            selectorBlackList: [], //要忽略并保留为px的选择器
            ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
            replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
            mediaQuery: true,  //（布尔值）允许在媒体查询中转换px。
            minPixelValue: 10 //设置要替换的最小像素值(3px会被转rem)。 默认 0
          })
        ]
      },

      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */
          'primary-color': '#1890FF',
          'link-color': '#1890FF',
          'border-radius-base': '4px'
        },
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    port: 3000,
    disableHostCheck: true,
    proxy: {
      /* '/api': {
         target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro', //mock API接口系统
         ws: false,
         changeOrigin: true,
         pathRewrite: {
           '/jeecg-boot': ''  //默认所有请求都加了jeecg-boot前缀，需要去掉
         }
       },*/

      '/master-api': {
        // target: 'http://localhost:8083', //请求本地 需要jeecg-boot后台项目
        // target: 'http://alpha.jpaihome.com',//test环境
        target: 'http://47.116.12.207:8087', //测试
        ws: false,
        changeOrigin: true
      }
    }
  },
  lintOnSave: undefined
}