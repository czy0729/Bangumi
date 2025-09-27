// @ts-nocheck
/*
 * @Author: czy0729
 * @Date: 2022-01-28 06:07:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 21:07:00
 */
import axiosRetry from 'axios-retry'
import Axios from '@utils/thirdParty/axios'

const CancelToken = Axios.CancelToken

const client = Axios.create({
  // 你的配置
})

// 安装 retry 插件
// 当请求失败后，自动重新请求，只有3次失败后才真正失败
axiosRetry(client, { retries: 3 })

export async function request(url: string, config) {
  const response = await client.request({ url, ...config })
  const result = response.data
  // 你的业务判断逻辑
  return result
}

export function withCancelToken(fetcher) {
  let abort

  function send(data, config) {
    cancel() // 主动取消

    const cancelToken = new CancelToken(cancel => (abort = cancel))
    return fetcher(data, { ...config, cancelToken })
  }

  function cancel(message = 'abort') {
    if (abort) {
      abort(message)
      abort = null
    }
  }

  return [send, cancel]
}

export default client
