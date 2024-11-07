/*
 * @Author: czy0729
 * @Date: 2024-11-08 06:51:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-08 06:52:42
 */
import { info, loading } from '@utils'
import { baiduTranslate } from '@utils/fetch'
import Computed from './computed'

export default class Action extends Computed {
  /** 翻译简介 */
  doTranslate = async () => {
    if (this.state.translateResult.length) return

    let hide: () => void
    try {
      hide = loading('请求中...')
      const response = await baiduTranslate(this.summary)
      hide()

      const { trans_result: translateResult } = JSON.parse(response)
      if (Array.isArray(translateResult)) {
        this.setState({
          translateResult
        })
        return
      }
      info('翻译失败, 请重试')
    } catch (error) {
      if (hide) hide()
      info('翻译失败, 请重试')
    }
  }
}
