/*
 * @Author: czy0729
 * @Date: 2026-10-04 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-05 00:00:00
 *
 * 找漫画 Store 入口
 */
import { createInit, sanitizeQuery } from '@_'
import { init } from '@utils/subject/manga'
import { filterDS } from '../ds'
import Action from './action'
import { NAMESPACE, STATE } from './ds'

export default class ScreenManga extends Action {
  init = createInit(this, {
    namespace: NAMESPACE,
    defaults: STATE.query,
    filterDS,
    initData: init,

    /** 条目页第三方标签块跳转携带 _tags, 新版标签为单选, 取首项映射到 tag (同 game 的 initQuery) */
    onBeforeSearch: store => {
      const { _tags = [] } = store.params || {}
      if (!_tags.length) return

      store.setState({
        expand: true,
        query: sanitizeQuery(
          {
            ...store.state.query,
            tag: typeof _tags === 'string' ? _tags : _tags[0]
          },
          STATE.query,
          filterDS
        )
      })
    }
  })
}
