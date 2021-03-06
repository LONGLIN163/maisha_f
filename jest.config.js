// module.exports = {
//   preset: '@vue/cli-plugin-unit-jest',
//   modulePaths: [
//     "<rootDir>"
//   ],
//   // ..
//   "moduleNameMapper": {
//     "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
//   }
  
// }

//jest.config.js
module.exports = {
  modulePaths: [
    "<rootDir>"
  ],

  moduleFileExtensions: [
    "js",
    "json",
    "vue"
  ],

  // get dom snapshot if you want to see the snapshot
  snapshotSerializers: ["jest-serializer-vue"],

  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest"
  },

  transformIgnorePatterns: ['/src/assets'],

  // ..
  moduleNameMapper: {
    "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub", // testing file will can import style file to the testing script
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  collectCoverage: false,

  //testEnvironment: 'jsdom', // it doesn matter if us jsdom.
  collectCoverageFrom: [
    "**/*.{js,vue}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/coverage/**",
    "!**/*.config.*",
    "!src/main.js"
  ],

  preset: '@vue/cli-plugin-unit-jest'
};
