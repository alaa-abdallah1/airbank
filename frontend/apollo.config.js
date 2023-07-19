// apollo.config.js
module.exports = {
  client: {
    service: {
      name: 'airBank-app',
      // URL to the GraphQL API
      url: process.env.VUE_APP_BASE_URL,
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.js'],
  },
}
