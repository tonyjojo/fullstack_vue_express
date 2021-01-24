const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../server/public"),
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000"
      }
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Trucos";
      return args;
    });
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/variables.scss"; @import "@/styles/helpers.scss";`
      }
    }
  }
};
