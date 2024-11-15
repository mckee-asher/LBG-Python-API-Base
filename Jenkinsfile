pipeline {
    environment {
        DOCKERHUB_CREDENTIALS = credentials("DOCKERHUB_CREDENTIALS")
        APP_NAME = "flask-app-project"
    }
    agent any
    stages {
        stage('Prepare Environment') {
            steps {
                sh "echo 'Cleaning up previous build artifacts...'"
                sh "sleep 3"
                sh "docker rm -f \$(docker ps -aq) || true"
                sh "docker rmi -f \$(docker images) || true"
                sh "echo 'Cleanup done.'"
            }
        }
        stage('Build') {
            steps {
                sh "docker build -t ${DOCKERHUB_CREDENTIALS_USR}/${APP_NAME}:latest ."
           }
        }
        stage('Print status') {
            steps {
                sh "docker ps -a"
                sh "docker images"
            }
        }
        stage('Push Images') {
            steps {
                sh "docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}"
                sh "docker push ${DOCKERHUB_CREDENTIALS_USR}/${APP_NAME}:latest"
                sh "docker logout"
            }
        }
    }
    post {
        success {
            echo "success"
        }
        failure {
            echo "failure"
        }
    }
}
