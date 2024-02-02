// import antfu from '@antfu/eslint-config'

// export default antfu({
//   react: true,
//   rules: {
//     curly: ['off'],
//   },
// })

// eslint.config.js
const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  react: true,
  rules: {
    curly: ['off'],
  },
})
