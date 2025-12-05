/*
 * @Author: czy0729
 * @Date: 2024-07-25 06:16:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 20:26:13
 */
import { otaStore } from '@stores'
import { updateVisibleBottom } from '@utils'
import { scrollToTop } from '@utils/dom'
import { t, withT } from '@utils/fetch'
import { WEB } from '@constants'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 初始化查询配置 */
  initQuery = (tags = []) => {
    this.setState({
      expand: true,
      query: {
        ...this.state.query,
        tags
      }
    })
  }

  /** 筛选选择 */
  onSelect = (type: string, value: string, multiple: boolean = false) => {
    const { query } = this.state
    if (type === 'tags') {
      const { tags = [] } = query
      if (multiple) {
        // 标签支持多选
        this.setState({
          query: {
            ...query,
            tags:
              value === ''
                ? []
                : tags.includes(value)
                ? tags.filter(item => value !== item)
                : [...tags, value]
          }
        })
      } else {
        this.setState({
          query: {
            ...query,
            tags: value === '' ? [] : [value]
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

  scrollToOffset: any = null

  forwardRef = (ref: { scrollToOffset: any }) => {
    if (ref?.scrollToOffset) this.scrollToOffset = ref.scrollToOffset
  }

  /** 到顶 */
  scrollToTop = withT(() => {
    if (WEB) {
      scrollToTop()
      return
    }

    if (typeof this.scrollToOffset === 'function') {
      this.scrollToOffset({
        x: 0,
        y: 0,
        animated: true
      })
    }
  }, 'Anime.到顶')

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

    return otaStore.onAnimePage(pageData)
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
