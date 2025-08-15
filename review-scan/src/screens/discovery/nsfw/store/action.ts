/*
 * @Author: czy0729
 * @Date: 2024-07-20 10:43:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 11:46:36
 */
import { otaStore } from '@stores'
import { t } from '@utils/fetch'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 筛选选择 */
  onSelect = (type: string, value: string) => {
    this.setState({
      query: {
        ...this.state.query,
        [type]: value
      }
    })

    setTimeout(() => {
      this.search()
      this.save()

      t('NSFW.选择', {
        type,
        value
      })
    }, 0)
  }

  scrollToOffset: any = null

  /** 到顶 */
  scrollToTop = () => {
    if (typeof this.scrollToOffset === 'function') {
      this.scrollToOffset({
        x: 0,
        y: 0,
        animated: true
      })

      t('NSFW.到顶')
    }
  }

  /** 切换布局 */
  switchLayout = () => {
    const value = this.isList ? 'grid' : 'list'
    this.setState({
      layout: value
    })
    this.save()

    t('NSFW.切换布局', {
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
      t('NSFW.更多', {
        page
      })
    }

    return otaStore.onNSFWPage(pageData)
  }
}
