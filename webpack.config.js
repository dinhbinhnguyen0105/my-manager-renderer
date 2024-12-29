const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"), // Tạo đường dẫn tuyệt đối tới thư mục 'dist'
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/, // Chỉ xử lý các file .css
                use: ["style-loader", "css-loader"] // Sử dụng style-loader và css-loader
            },
            {
                test: /\.(js|jsx)$/, // Chỉ xử lý các file .js hoặc .jsx
                exclude: /node_modules/, // Loại trừ thư mục 'node_modules'
                use: {
                    loader: "babel-loader", // Sử dụng babel-loader
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"] // Sử dụng các preset cần thiết
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "svg-url-loader",
                        options: { limit: 10000, },
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"] // Xác định các extension mà webpack sẽ xử lý
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'), // Thư mục chứa các file tĩnh
        },
        compress: true, // Bật nén gzip
        port: 3000, // Cổng của dev server
    },
};