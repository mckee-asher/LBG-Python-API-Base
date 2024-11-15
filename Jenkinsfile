pipeline {
    environment {
        DOCKERHUB_CREDENTIALS = credentials("DOCKERHUB_CREDENTIALS")
        APP_NAME = "flask_app_project"
    }
    agent any
    stages {
        stage('Build') {
            steps {
                sh "sh setup.sh"
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
                sh "docker push ${DOCKERHUB_CREDENTIALS_USR}/flask_app_project:latest"
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
        always {
            sh "docker rm -f \$(docker ps -aq) || sleep 1"
            sh "docker system prune -f"
        }
    }
}
