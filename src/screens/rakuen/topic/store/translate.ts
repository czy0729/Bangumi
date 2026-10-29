/*
 * @Author: czy0729
 * @Date: 2026-10-30 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 帖子翻译相关动作
 */
import { systemStore } from '@stores'
import { info, loading, removeHTMLTag } from '@utils'
import { baiduTranslate, t } from '@utils/fetch'
import { lx, lxCache } from '@utils/kv'
import { getTopicMainFloorRawText } from '../utils'
import Reply from './reply'

import type { Id } from '@types'

export default class Translate extends Reply {
  /** 翻译内容 */
  doTranslate = async () => {
    if (this.state.translateResult.length) return

    t('帖子.翻译内容', {
      topicId: this.topicId
    })

    const isGemini = systemStore.translateEngine === 'gemini'
    const errorInfo = `翻译${isGemini ? '超时' : '失败'}, 请重试`
    let hide: () => void
    try {
      hide = loading()

      const text = getTopicMainFloorRawText(this.title, this.html)

      // 不管翻译引擎, 先尝试获取云缓存
      const cache = await lxCache(text)
      if (cache) {
        hide()
        this.setState({
          translateResult: cache
        })
        return
      }

      if (isGemini) {
        const response = await lx(text, systemStore.advance)
        hide()

        if (response) {
          this.setState({
            translateResult: response
          })
          return
        }

        hide = loading()
      }

      const response = await baiduTranslate(text)
      hide()

      const { trans_result: translateResult } = JSON.parse(response) as {
        trans_result?: { dst: string }[]
      }
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

  /** 翻译楼层 */
  doTranslateFloor = async (floorId: Id, msg: string) => {
    const { translateResultFloor } = this.state
    if (translateResultFloor[floorId]) return

    t('帖子.翻译内容', {
      floorId
    })

    const isGemini = systemStore.translateEngine === 'gemini'
    const errorInfo = `翻译${isGemini ? '超时' : '失败'}, 请重试`
    let hide: () => void
    try {
      hide = loading()

      const text = removeHTMLTag(msg.replace(/<br>/g, '\n'), false)

      // 不管翻译引擎, 先尝试获取云缓存
      const cache = await lxCache(text)
      if (cache) {
        hide()
        this.setState({
          translateResultFloor: {
            ...translateResultFloor,
            [floorId]: cache.map(item => item.dst).join('\n')
          }
        })
        return
      }

      if (isGemini) {
        const translateResult = await lx(text, systemStore.advance)
        hide()

        if (translateResult) {
          this.setState({
            translateResultFloor: {
              ...translateResultFloor,
              [floorId]: translateResult.map(item => item.dst).join('\n')
            }
          })
          return
        }

        hide = loading()
      }

      const response = await baiduTranslate(text)
      hide()

      const { trans_result: translateResult } = JSON.parse(response) as {
        trans_result?: { dst: string }[]
      }
      if (Array.isArray(translateResult)) {
        this.setState({
          translateResultFloor: {
            ...translateResultFloor,
            [floorId]: translateResult.map(item => item.dst).join('\n')
          }
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
