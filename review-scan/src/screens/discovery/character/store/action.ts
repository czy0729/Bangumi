/*
 * @Author: czy0729
 * @Date: 2024-12-03 15:39:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-03 16:50:46
 */
import { updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import Fetch from './fetch'

export default class Action extends Fetch {
  onChange = (page: number) => {
    if (page === this.state.page) return

    this.setState({
      page
    })

    if (!this.list(this.id)._loaded) this.fetchList(this.id, true)

    t('收藏的人物.标签页切换')
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
