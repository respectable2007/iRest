# iRest
## Steps 步骤条
## js加载css文件
   npm install --save-dev style-loader@0.21.0 css-loader@0.28.11<br>
   webpack.base.config.js中添加如下代码：<br>
   {<br>
    test:/\.css$/,<br>
    loader: 'style-loader!css-loader'<br>
   }<br>