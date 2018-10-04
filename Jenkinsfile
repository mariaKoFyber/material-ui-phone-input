node('Console CI Slave') {
  stage('Install') {
    sh "npm install"
  }

  stage('Compile') {
    sh "npm run build"
  }

  stage('Test') {
    sh "npm test"
  }

  stage('Publish') {
    sh "npm publish"
  }
}
