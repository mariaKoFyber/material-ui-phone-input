node('Console CI Slave') {
  withEnv(["PATH+NODE=${tool name: 'NodeJs 8.9.0', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
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
}
