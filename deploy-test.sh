export DEPLOYMENT_BUCKET_NAME=me-nft-deployment
export NODE_ENV=test
aws-vault exec bloctech --no-session -- yarn deploy serverless-test.yml