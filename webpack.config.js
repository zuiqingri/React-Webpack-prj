var webpack=require('webpack');

module.exports={
    entry:'./src/index.js',

    output:{
        path:__dirname + '/public/',
        filename:'bundle.js'
    },
   mode:'development',
    devServer:{
        hot:true,
        //inline:true,
        //host:'0,0,0,0',
        port:4000,
        static:__dirname + '/public/',
        
    },

    module:{
        rules:[
            {
                test:/\.js$/,
                use:['react-hot-loader/webpack','babel-loader?'+JSON.stringify({
                    cacheDirectory:true,
                    presets:['es2015','react']
                })],
                exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
}