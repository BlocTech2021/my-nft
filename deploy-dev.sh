export DEPLOYMENT_BUCKET_NAME=me-nft-deployment
export NODE_ENV=dev
aws-vault exec bloctech --no-session -- yarn deploy serverless-dev.yml