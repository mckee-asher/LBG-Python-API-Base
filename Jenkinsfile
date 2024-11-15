pipeline {
    environment {
        DOCKERHUB_CREDENTIALS = credentials("DOCKERHUB_CREDENTIALS")
        APP_NAME = "flask-app-project"
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
        // always {
        //     // sh "docker rm -f \$(docker ps -aq) || sleep 1"
        //     // sh "docker system prune -f"
        // }
    }
}
