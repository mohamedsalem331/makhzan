import * as redis from 'redis'

const redis_client = redis.createClient()
export default redis_client
