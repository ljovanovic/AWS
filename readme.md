# LJLabs AWS Services

This readme was created to provide a quick overview of environmental setup and a quick start tutorial for the services contained within the LJLabs project.

## Environment Setup
To get up and running the following packages / frameworks must be installed on your machine:

 - Homebrew ( https://brew.sh/ )
 - nvm (`brew install nvm` and then follow on-screen instructions)
 - node 8.10 (`nvm install v8.10.0` and then consider setting default alias to 8.10)
 - step into the project root and perform an `npm install`
 - step into the /service folder and perform an `npm install` 
 - ensure aws credentials for the profile 'serverless' are set at ~/.aws/credentials
 - perform a serverless login via the cli (visit [serverless.com](serverless.com) for more details)

## Deployment

If everything is set up correctly, you should be able to step into the project root and perform `serverless deploy`