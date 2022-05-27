// let MAGIC_SECRET_KEY, SALT, PINATA_JWT, SENTRY_DSN, DATABASE_TOKEN, CLUSTER_SERVICE, LOGTAIL_TOKEN, MAILCHIMP_API_KEY, METAPLEX_AUTH_TOKEN

export const secrets = {
  privateKey: PRIVATE_KEY,
  salt: SALT,
  magic: MAGIC_SECRET_KEY,
  sentry: SENTRY_DSN,
  database: DATABASE_TOKEN,
  mailchimp: MAILCHIMP_API_KEY,
  logtail: LOGTAIL_TOKEN,
  metaplexAuth:
    typeof METAPLEX_AUTH_TOKEN !== 'undefined'
      ? METAPLEX_AUTH_TOKEN
      : undefined,
}

const CLUSTER1 = 'https://nft.storage.ipfscluster.io/api/'
const CLUSTER2 = 'https://nft2.storage.ipfscluster.io/api/'
const CLUSTER3 = 'https://nft3.storage.ipfscluster.io/api/'

let clusterUrl
if (typeof CLUSTER_SERVICE !== 'undefined' && CLUSTER_SERVICE) {
  if (CLUSTER_SERVICE === 'IpfsCluster') {
    clusterUrl = CLUSTER1
  } else if (CLUSTER_SERVICE === 'IpfsCluster2') {
    clusterUrl = CLUSTER2
  } else if (CLUSTER_SERVICE === 'IpfsCluster3') {
    clusterUrl = CLUSTER3
  } else {
    throw new Error(`unknown cluster service: ${CLUSTER_SERVICE}`)
  }
} else {
  clusterUrl = CLUSTER_API_URL
}

export const cluster = {
  apiUrl: clusterUrl,
  basicAuthToken: CLUSTER_BASIC_AUTH_TOKEN,
}

export const database = {
  url: DATABASE_URL,
}

export const isDebug = DEBUG === 'true'

export const s3 = {
  endpoint: typeof S3_ENDPOINT !== 'undefined' ? S3_ENDPOINT : '',
  region: typeof S3_REGION !== 'undefined' ? S3_REGION : '',
  accessKeyId: typeof S3_ACCESS_KEY_ID !== 'undefined' ? S3_ACCESS_KEY_ID : '',
  secretAccessKey:
    typeof S3_SECRET_ACCESS_KEY !== 'undefined' ? S3_SECRET_ACCESS_KEY : '',
  bucketName: typeof S3_BUCKET_NAME !== 'undefined' ? S3_BUCKET_NAME : '',
}
