import redis_client from '../config/redis'

const setRedisValue = async (key: string, value: object | string): Promise<string> => {
  const data = await redis_client.set(key.toString(), JSON.stringify(value))
  if (!data) throw new Error()
  return data
}

const getRedisValue = async (key: string): Promise<string> => {
  const data = await redis_client.get(key.toString())
  if (!data) throw new Error()
  return data
}

const delRedisValue = async (key: string): Promise<void> => {
  const data = await redis_client.del(key.toString())
  if (!data) throw new Error()
}

export { getRedisValue, setRedisValue, delRedisValue }
