/*
 * @Author: czy0729
 * @Date: 2024-07-25 06:16:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-04 19:22:10
 */
import { sanitizeQuery } from '@_'
import { isArray } from '@utils'
import { collectionStore, otaStore } from '@stores'
import { updateVisibleBottom } from '@utils'
import { scrollToTop } from '@utils/dom'
import { t } from '@utils/fetch'
import { WEB } from '@constants'
import { FILTER_DS } from '../ds'
import Fetch from './fetch'
import { STATE } from './ds'

import type { ScrollToOffset } from '@components'

export default class Action extends Fetch {
  /** 初始化查询配置 */
  initQuery = (tags = []) => {
    this.setState({
      expand: true,
      query: sanitizeQuery(
        {
          ...this.state.query,
          tags
        },
        STATE.query,
        FILTER_DS
      )
    })
  }

  /** 筛选选择 */
  onSelect = (type: string, value: string, multiple: boolean = false) => {
    const { query } = this.state
    if (type === 'tags' || type === 'meta') {
      /** 标签 / 类型 meta 支持多选 (历史缓存可能是非数组形态, 先归一) */
      const { tags, meta } = query
      const raw = type === 'tags' ? tags : meta
      const list: string[] = isArray(raw) ? raw : []
      if (multiple) {
        this.setState({
          query: {
            ...query,
            [type]:
              value === ''
                ? []
                : list.includes(value)
                ? list.filter(item => value !== item)
                : [...list, value]
          }
        })
      } else {
        this.setState({
          query: {
            ...query,
            [type]: value === '' ? [] : [value]
          }
        })
      }
    } else {
      this.setState({
        query: {
          ...query,
          [type]: value
        }
      })
    }

    setTimeout(() => {
      this.search()
      this.save()

      t('Anime.选择', {
        type,
        value,
        multiple
      })
    }, 0)
  }

  scrollToOffset: ScrollToOffset = null

  forwardRef = (ref: { scrollToOffset: ScrollToOffset }) => {
    if (ref?.scrollToOffset) this.scrollToOffset = ref.scrollToOffset
  }

  /** 到顶 */
  scrollToTop = () => {
    t('Anime.到顶')

    if (WEB) {
      scrollToTop()
      return
    }

    if (typeof this.scrollToOffset === 'function') {
      this.scrollToOffset({
        offset: 0,
        animated: true
      })
    }
  }

  /** 切换布局 */
  switchLayout = () => {
    const layout = this.isList ? 'grid' : 'list'
    this.setState({
      layout
    })
    this.save()

    t('Anime.切换布局', {
      layout
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
      t('Anime.更多', {
        page
      })
    }

    setTimeout(() => {
      collectionStore.fetchCollectionStatusQueue(
        pageData.map(item => otaStore.animeSubjectId(item)).filter(Boolean)
      )
    }, 0)

    return otaStore.onAnimePage(pageData)
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
