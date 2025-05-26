pipeline {
    agent any

    environment {
        IMAGE_NAME = 'bsavanth/cloud-capstone-frontend-image'
        DOCKER_USER = 'bsavanth'
        DOCKER_PASS = 'Abhijeeth6' // Consider using Jenkins credentials instead
    }

    stages {
        stage('Clone GitHub Repo') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/master']],
                    extensions: [],
                    userRemoteConfigs: [[url: 'https://github.com/bsavanth/Cloud_Capstone_Frontend']]
                ])
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing node modules...'
                bat 'npm install'
            }
        }

        stage('Build Angular App') {
            steps {
                echo 'Building Angular app in production mode...'
                bat 'ng build --configuration production'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    bat "docker login -u ${DOCKER_USER} -p ${DOCKER_PASS} docker.io"
                    bat "docker push ${IMAGE_NAME}"
                    bat "docker logout"
                }
            }
        }
    }

    post {
        success {
            echo '✅ Angular frontend pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed.'
        }
    }
}
