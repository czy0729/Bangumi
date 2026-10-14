/*
 * @Author: czy0729
 * @Date: 2019-06-22 15:38:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找 Hentai 用户操作
 */
import { otaStore } from '@stores'
import { t } from '@utils/fetch'
import { getTagType, HENTAI_TAGS_MAP } from '@utils/subject/hentai'
import Fetch from './fetch'

import type { ScrollToOffset } from '@components'
import type { FilterType } from '../types'

export default class Action extends Fetch {
  /** 列表滚动方法 (连接列表后可用) */
  scrollToOffset: ScrollToOffset = null

  /** 连接页面列表 */
  forwardRef = (ref: { scrollToOffset: ScrollToOffset }) => {
    if (ref?.scrollToOffset) this.scrollToOffset = ref.scrollToOffset
  }

  /** 初始化查询配置 (条目页第三方标签跳转携带 _tags) */
  initQuery = (tags: string[] = []) => {
    this.setState({
      expand: true
    })

    tags.forEach(item => {
      const tag = HENTAI_TAGS_MAP[item as keyof typeof HENTAI_TAGS_MAP]
      if (tag === undefined) return

      this.setState({
        query: {
          ...this.state.query,
          [getTagType(tag)]: item
        }
      })
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

      t('Hentai.选择', {
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

    t('Hentai.到顶')
  }

  /** 切换布局 */
  switchLayout = () => {
    const value = this.isList ? 'grid' : 'list'
    this.setState({
      layout: value
    })
    this.save()

    t('Hentai.切换布局', {
      layout: value
    })
  }

  /** 展开收起筛选 */
  onExpand = () => {
    this.setState({
      expand: !this.state.expand
    })
    this.save()
  }

  /** 加载下一页 */
  onPage = (pageData: number[], page: number) => {
    if (page && page % 5 === 0) {
      t('Hentai.更多', {
        page
      })
    }

    return otaStore.onHentaiPage(pageData)
  }
}
