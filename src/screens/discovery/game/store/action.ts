/*
 * @Author: czy0729
 * @Date: 2024-07-25 20:34:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找游戏用户操作
 */
import { sanitizeQuery } from '@_'
import { otaStore } from '@stores'
import { t } from '@utils/fetch'
import { filterDS } from '../ds'
import Fetch from './fetch'
import { STATE } from './ds'

import type { ScrollToOffset } from '@components'
import type { FilterType } from '../types'

export default class Action extends Fetch {
  /** 列表滚动方法 (连接列表后可用) */
  scrollToOffset: ScrollToOffset = null

  /** 连接页面列表 */
  forwardRef = (ref: { scrollToOffset: ScrollToOffset }) => {
    if (ref?.scrollToOffset) this.scrollToOffset = ref.scrollToOffset
  }

  /** 初始化查询配置 */
  initQuery = (tags: string[] = []) => {
    this.setState({
      expand: true,
      query: sanitizeQuery(
        {
          ...this.state.query,
          cate: tags[0]
        },
        STATE.query,
        filterDS
      )
    })
  }

  /**
   * 筛选选择
   *
   * @param type 筛选维度
   * @param value 筛选值
   */
  onSelect = (type: FilterType, value: string) => {
    this.setState({
      query: {
        ...this.state.query,
        [type]: value
      }
    })

    setTimeout(() => {
      this.search()
      this.save()

      t('游戏.选择', {
        type,
        value
      })
    }, 0)
  }

  /** 到顶 */
  scrollToTop = () => {
    if (typeof this.scrollToOffset !== 'function') return

    this.scrollToOffset({
      offset: 0,
      animated: true
    })

    t('游戏.到顶')
  }

  /** 切换布局 */
  switchLayout = () => {
    const value = this.isList ? 'grid' : 'list'
    this.setState({
      layout: value
    })
    this.save()

    t('游戏.切换布局', {
      layout: value
    })
  }

  /** 展开 */
  onExpand = () => {
    this.setState({
      expand: !this.state.expand
    })
    this.save()
  }

  /** 加载下一页 */
  onPage = (pageData: number[], page: number) => {
    if (page && page % 5 === 0) {
      t('游戏.更多', {
        page
      })
    }

    return otaStore.onGamePage(pageData)
  }
}
