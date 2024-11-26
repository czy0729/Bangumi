/*
 * @Author: czy0729
 * @Date: 2024-06-03 11:43:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-30 17:09:58
 */
import { collectionStore, searchStore } from '@stores'
import { feedback, info } from '@utils'
import { t } from '@utils/fetch'
import Computed from './computed'
import { EXCLUDE_STATE } from './ds'

export default class Fetch extends Computed {
  /** 搜索 */
  doSearch = async (refresh?: boolean) => {
    const { history, cat, legacy, value } = this.state
    if (value === '') {
      info('请输入内容')
      return
    }

    t('搜索.搜索', {
      cat,
      value
    })

    const _history = [...history]
    if (!history.includes(value)) _history.unshift(value)

    if (refresh) {
      if (_history.length > 10) _history.pop()

      this.setState({
        history: _history,
        searching: true,
        visibleBottom: EXCLUDE_STATE.visibleBottom
      })
      this.save()
    }

    try {
      const data = await searchStore.fetchSearch(
        {
          cat,
          legacy,
          text: value
        },
        refresh
      )

      // 延迟获取收藏中的条目的具体收藏状态
      setTimeout(() => {
        collectionStore.fetchCollectionStatusQueue(
          data.list
            .filter(item => item.collected)
            .map(item => String(item.id).replace('/subject/', ''))
        )
      }, 160)
    } catch (ex) {
      info('请稍候再查询')
    }

    this.setState({
      searching: false
    })
    if (refresh) feedback(true)
  }
}
