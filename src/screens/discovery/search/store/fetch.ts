/*
 * @Author: czy0729
 * @Date: 2024-06-03 11:43:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-08 01:49:24
 *
 * 搜索请求与收藏状态队列
 */
import { Keyboard } from 'react-native'
import { collectionStore, searchStore } from '@stores'
import { feedback, info } from '@utils'
import { t } from '@utils/fetch'
import Computed from './computed'
import { COLLECTION_QUEUE_DELAY, EXCLUDE_STATE } from './ds'

export default class Fetch extends Computed {
  /** 未触发的延迟任务, 卸载时统一清理 */
  private delayTasks: ReturnType<typeof setTimeout>[] = []

  /** 延迟执行, 页面卸载后不再触发 */
  protected delay = (fn: () => void, ms: number) => {
    const handle = setTimeout(() => {
      this.delayTasks = this.delayTasks.filter(item => item !== handle)
      fn()
    }, ms)

    this.delayTasks.push(handle)
  }

  /** 清理延迟任务 */
  clearDelayTasks = () => {
    this.delayTasks.forEach(clearTimeout)
    this.delayTasks = []
  }

  /** 搜索 */
  doSearch = async (refresh?: boolean) => {
    const { history, cat, legacy, value } = this.state
    if (!value.trim()) {
      info('请输入内容')
      return
    }

    t('搜索.搜索', {
      cat,
      value
    })

    const updatedHistory = history.includes(value) ? [...history] : [value, ...history].slice(0, 11)

    if (refresh) {
      this.setState({
        history: updatedHistory,
        searching: true,
        visibleBottom: EXCLUDE_STATE.visibleBottom
      })
      this.save()
    }

    try {
      const data = await searchStore.fetchSearch(value, cat, legacy, refresh)
      Keyboard.dismiss()

      // 延迟获取收藏中的条目的具体收藏状态
      this.delay(() => {
        collectionStore.fetchCollectionStatusQueue(
          data.list
            .filter(item => item.collected)
            .map(item => String(item.id).replace('/subject/', ''))
        )
      }, COLLECTION_QUEUE_DELAY)
    } catch (ex) {
      info('请稍候再查询')
    }

    this.setState({
      searching: false
    })
    if (refresh) feedback(true)
  }
}
