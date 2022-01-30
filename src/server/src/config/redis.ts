import * as redis from 'redis'

const redis_client = redis.createClient()
export default redis_client

// .then(() => {
//   return jwtr.verify('64564564563342gdfs432', secret)
// })
// const redis_client = redis.createClient(6379, process.env.REDIS_HOST)

// redis_client.on('connect', function () {
//   console.log('redis client connected')
// })
