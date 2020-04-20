module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: `../public`,
  transpileDependencies: ["vuetify"],
};
