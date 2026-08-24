import { observable, runInAction } from 'mobx'
import { axios } from '@utils/thirdParty'
import { syncSystemStore } from '../async'
import { getTimestamp, runAfter } from '../utils'
import { DEFAULT_WEBHOOK_URL, MAX_LENGTH } from './ds'

import type { WebHooksTypes } from './types'

/** 发送日志项 */
export type LogItem = {
  /** 日志类型 */
  label: 'POST' | 'RESULT' | 'ERROR'

  /** 内容 (JSON) */
  content: string
  ts: number
}

/** 发送日志 */
export const logs = observable<LogItem>([])

/** 追加一条日志, 超出上限丢弃最早的一条 */
function pushLog(label: LogItem['label'], content: string) {
  runInAction(() => {
    logs.unshift({
      label,
      content,
      ts: getTimestamp()
    })
    if (logs.length > MAX_LENGTH) logs.pop()
  })
}

/** 钩子 */
export const webhook: WebHooksTypes = (type, data) => {
  if (!type) return false

  try {
    const systemStore = syncSystemStore()
    if (!systemStore.setting.webhook) return false

    // 保证这种低优先级的操作在 UI 响应之后再执行
    runAfter(async () => {
      try {
        let url = systemStore.setting.webhookUrl || DEFAULT_WEBHOOK_URL
        if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
          url = `http://${url}`
        }

        const params = {
          method: 'post',
          url,
          data: {
            type,
            data: data || {}
          }
        } as const

        pushLog('POST', JSON.stringify(params, null, 2))

        const res = await axios(params)
        const content: Record<string, unknown> = {
          status: res?.status
        }
        if (typeof res?.data === 'object') {
          content.data = res.data
        } else {
          // RN XMLHttpRequest 的原始响应文本挂在 request._response 上
          const request = res?.request as { _response?: unknown } | undefined
          content._response = request?._response
        }

        pushLog('RESULT', JSON.stringify(content, null, 2))
      } catch (error) {
        pushLog('ERROR', (error as Error)?.message || '')
      }
    })
  } catch (error) {
    pushLog('ERROR', 'unknow error')
  }
}
