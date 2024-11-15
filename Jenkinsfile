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
                sh "echo 'Building the Docker image...'"
                sh "sleep 3"
                sh "docker build -t ${DOCKERHUB_CREDENTIALS_USR}/${APP_NAME}:latest ."
                sh "echo 'Modifying the application...'"
                sh "sleep 3"
                sh "export PORT=5001"
                sh "echo 'Modifications done. Port is now set to 5001'"
                sh "docker build -t ${DOCKERHUB_CREDENTIALS_USR}/${APP_NAME}:latest ."
                sh "echo 'Building docker image complete'"
           }
        }

        stage('Run') {
            steps {
                sh "echo 'Running Docker container...'"
                sh "sleep 3"
                sh "docker run -d -p 80:80 -e PORT=80 --name ${APP_NAME} ${DOCKERHUB_CREDENTIALS_USR}/${APP_NAME}"
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

    //     stage('Unit Test') {
    //         steps {
    //             // sh "python lbg_test.py"
    //             sh "docker run  sh -c ${DOCKERHUB_CREDENTIALS_USR}/${APP_NAME} 'py test'"
    //         }

    //     }
    // }
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
