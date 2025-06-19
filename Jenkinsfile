pipeline {
    agent any

    environment {
        IMAGE_NAME = 'bsavanth/cloud-capstone-frontend-image'
        DOCKER_USER = 'bsavanth'
        DOCKER_PASS = 'Abhijeeth6' // ✅ Consider storing this securely in Jenkins credentials

        AWS_REGION = 'us-east-2'
        AWS_ACCOUNT_ID = '605383994027'
        ECR_REGISTRY = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
        ECR_IMAGE_NAME = "${ECR_REGISTRY}/cloud-capstone-frontend-image"
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
                bat "docker build -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing image to Docker Hub...'
                bat """
                    docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}
                    docker push ${IMAGE_NAME}:latest
                    docker logout
                """
            }
        }

        stage('Check AWS Access') {
            steps {
                bat 'aws sts get-caller-identity'
            }
        }


        stage('Authenticate to AWS ECR') {
            steps {
                echo 'Authenticating to AWS ECR...'
                bat """
                    aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}
                """
            }
        }

        stage('Tag & Push to AWS ECR') {
            steps {
                echo 'Tagging and pushing to AWS ECR...'
                bat """
                    docker tag ${IMAGE_NAME}:latest ${ECR_IMAGE_NAME}:latest
                    docker push ${ECR_IMAGE_NAME}:latest
                    docker logout ${ECR_REGISTRY}
                """
            }
        }
    }

    post {
        success {
            echo '✅ Angular frontend image pushed to Docker Hub and AWS ECR successfully!'
        }
        failure {
            echo '❌ Frontend pipeline failed.'
        }
    }
}
