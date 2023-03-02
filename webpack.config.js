const path = require('path')
const HWP = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    environment: {
      //不用箭头函数
      arrowFunction: false,
      //不用常量
      const:false

    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 
        [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      "ie": "11"
                    },
                    "corejs": "3",
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        exclude: /node_modules/
      },
      // 指定设置less文件的处理规则
      {
        test: /.\less$/,
        use: [
          // loader的执行顺序是从下到上
          "style-loader",
          "css-loader",
          {
            //先处理css兼容问题再使用css加载器
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      //兼容最新两个版本的浏览器
                      browsers: 'last 20 versions'
                    }
                  ]
                ]
              }
            }
          },
          "less-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js",".ts"]
  },
  plugins: [
    new HWP({
      template: 'src/index.html'
    })
  ],
  mode: 'development'
}