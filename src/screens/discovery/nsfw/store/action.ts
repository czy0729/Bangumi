/*
 * @Author: czy0729
 * @Date: 2024-07-20 10:43:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-20 11:28:27
 */
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
    const _layout = this.isList ? 'grid' : 'list'
    t('NSFW.切换布局', {
      layout: _layout
    })

    this.setState({
      layout: _layout
    })
    this.save()
  }

  /** 展开收起筛选 */
  onExpand = () => {
    this.setState({
      expand: !this.state.expand
    })
    this.save()
  }
}
