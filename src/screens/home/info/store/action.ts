/*
 * @Author: czy0729
 * @Date: 2024-11-08 06:51:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-07 05:17:58
 */
import { systemStore } from '@stores'
import { info, loading } from '@utils'
import { baiduTranslate } from '@utils/fetch'
import { lx, lxCache } from '@utils/kv'
import Computed from './computed'

export default class Action extends Computed {
  /** 翻译简介 */
  doTranslate = async () => {
    if (this.state.translateResult.length) return

    const isGemini = systemStore.translateEngine === 'gemini'
    const errorInfo = `翻译${isGemini ? '超时' : '失败'}, 请重试`
    let hide: () => void
    try {
      hide = loading()

      // 不管翻译引擎, 先尝试获取云缓存
      const cache = await lxCache(this.summary)
      if (cache) {
        hide()
        this.setState({
          translateResult: cache
        })
        return
      }

      if (isGemini) {
        const response = await lx(this.summary, systemStore.advance)
        hide()

        if (response) {
          this.setState({
            translateResult: response
          })
          return
        }

        hide = loading()
      }

      const response = await baiduTranslate(this.summary)
      hide()

      const { trans_result: translateResult } = JSON.parse(response)
      if (Array.isArray(translateResult)) {
        this.setState({
          translateResult
        })
        return
      }

      info(errorInfo)
    } catch (error) {
      if (hide) hide()

      info(errorInfo)
    }
  }
}
