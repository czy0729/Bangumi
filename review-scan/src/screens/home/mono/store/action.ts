/*
 * @Author: czy0729
 * @Date: 2023-04-21 18:33:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-10 04:42:22
 */
import { systemStore, tinygrailStore, userStore } from '@stores'
import { feedback, info, loading, open, removeHTMLTag } from '@utils'
import { baiduTranslate, fetchHTML, t } from '@utils/fetch'
import { lx } from '@utils/kv'
import { webhookMono } from '@utils/webhooks'
import { HOST } from '@constants'
import { Id, Navigation } from '@types'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 人物更多资料点击 */
  onMore = () => {
    t('人物.更多资料', {
      monoId: this.monoId
    })

    return open(
      `https://mzh.moegirl.org.cn/index.php?title=${encodeURIComponent(
        this.cn || this.jp
      )}&mobileaction=toggle_view_mobile`
    )
  }
  /** 展开回复子楼层 */
  toggleExpand = (id: Id) => {
    const { expands } = this.state
    this.setState({
      expands: expands.includes(id) ? expands.filter(item => item !== id) : [...expands, id]
    })
  }

  // -------------------- action --------------------
  /** 收藏人物 */
  doCollect = async () => {
    const { collectUrl } = this.mono
    if (!collectUrl) return false

    t('人物.收藏人物', {
      monoId: this.monoId
    })

    await fetchHTML({
      method: 'POST',
      url: `${HOST}${collectUrl}`
    })
    feedback()
    info('已收藏')
    webhookMono(
      {
        ...this.mono,
        id: this.monoId
      },
      userStore.userInfo
    )

    return this.fetchMono()
  }

  /** 取消收藏人物 */
  doEraseCollect = async () => {
    const { eraseCollectUrl } = this.mono
    if (!eraseCollectUrl) return false

    t('人物.取消收藏人物', {
      monoId: this.monoId
    })

    await fetchHTML({
      method: 'POST',
      url: `${HOST}${eraseCollectUrl}`
    })
    feedback()
    info('已取消收藏')

    return this.fetchMono()
  }

  /** 开启 ICO */
  doICO = async (navigation: Navigation) => {
    t('人物.启动ICO', {
      monoId: this.monoId
    })

    const data = await tinygrailStore.doICO({
      monoId: this.monoId.replace('character/', '')
    })

    if (data.State !== 0) {
      info('启动ICO失败')
      return
    }

    navigation.push('TinygrailICODeal', {
      monoId: this.monoId.replace('character/', '')
    })
    this.fetchChara()
  }

  /** 翻译内容 */
  doTranslate = async (key = 'translateResult', content: any) => {
    if (this.state[key].length) return

    t('人物.翻译内容', {
      monoId: this.monoId
    })

    const isDeepLX = systemStore.setting.translateEngine === 'deeplx'
    const errorInfo = `翻译${isDeepLX ? '超时' : '失败'}, 请重试`
    let hide: () => void
    try {
      hide = loading()

      const text = String(content)
        .replace(/<br \/>/g, '\n')
        .replace(/<\/?[^>]*>/g, '') // 去除HTML tag
      if (isDeepLX) {
        const response = await lx(text)
        hide()

        if (response) {
          this.setState({
            [key]: response
          })
          return
        }
      } else {
        const response = await baiduTranslate(text)
        hide()

        const { trans_result } = JSON.parse(response)
        if (Array.isArray(trans_result)) {
          this.setState({
            [key]: trans_result
          })
          return
        }
      }

      info(errorInfo)
    } catch (error) {
      if (hide) hide()

      info(errorInfo)
    }
  }

  /** 翻译楼层 */
  doTranslateFloor = async (floorId: string | number, msg: string) => {
    const { translateResultFloor } = this.state
    if (translateResultFloor[floorId]) return

    t('人物.翻译内容', {
      floorId
    })

    const isDeepLX = systemStore.setting.translateEngine === 'deeplx'
    const errorInfo = `翻译${isDeepLX ? '超时' : '失败'}, 请重试`
    let hide: () => void
    try {
      hide = loading()

      const text = removeHTMLTag(msg.replace(/<br>/g, '\n'))
      if (isDeepLX) {
        const translateResult = await lx(text)
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
      } else {
        const response = await baiduTranslate(text)
        hide()

        const { trans_result: translateResult } = JSON.parse(response)
        if (Array.isArray(translateResult)) {
          this.setState({
            translateResultFloor: {
              ...translateResultFloor,
              [floorId]: translateResult.map(item => item.dst).join('\n')
            }
          })
          return
        }
      }

      info(errorInfo)
    } catch (error) {
      if (hide) hide()

      info(errorInfo)
    }
  }
}
