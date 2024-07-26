import { otaStore } from '@stores'
/*
 * @Author: czy0729
 * @Date: 2024-07-26 05:10:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-26 05:23:42
 */
import { t } from '@utils/fetch'
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
  onSelect = (type: string, value: string, multiple = false) => {
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

      t('Manga.选择', {
        type,
        value,
        multiple
      })
    }, 0)
  }

  scrollToOffset = null

  /** 到顶 */
  scrollToTop = () => {
    if (typeof this.scrollToOffset === 'function') {
      this.scrollToOffset({
        x: 0,
        y: 0,
        animated: true
      })

      t('Manga.到顶')
    }
  }

  /** 切换布局 */
  switchLayout = () => {
    const value = this.isList ? 'grid' : 'list'
    this.setState({
      layout: value
    })
    this.save()

    t('Manga.切换布局', {
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
      t('Manga.更多', {
        page
      })
    }

    return otaStore.onMangaPage(pageData)
  }
}
