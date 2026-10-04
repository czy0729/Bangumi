/*
 * @Author: czy0729
 * @Date: 2026-10-04 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-04 00:00:00
 *
 * 找漫画 Store 入口
 */
import { init } from '@utils/subject/manga'
import Action from './action'
import { NAMESPACE } from './ds'

import type { STATE } from './ds'

let _loaded = false

export default class ScreenManga extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      _loaded
    })

    if (!_loaded) await init()
    _loaded = true

    /** 条目页第三方标签块跳转携带 _tags, 新版标签为单选, 取首项映射到 tag (同 game 的 initQuery) */
    const { _tags = [] } = this.params
    if (_tags.length) {
      this.setState({
        expand: true,
        query: {
          ...this.state.query,
          tag: typeof _tags === 'string' ? _tags : _tags[0]
        }
      })
    }

    this.search()
    setTimeout(() => {
      this.setState({
        _loaded: true
      })
    }, 120)
  }
}
