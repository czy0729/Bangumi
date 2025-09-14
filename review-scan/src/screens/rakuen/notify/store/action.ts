/*
 * @Author: czy0729
 * @Date: 2024-10-08 16:55:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-08 17:18:40
 */
import { rakuenStore } from '@stores'
import { updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 标签页切换 */
  onTabsChange = (page: number) => {
    this.setState({
      page
    })
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)

  /** 清除电波提醒所有未读 */
  doClearNotify = () => {
    rakuenStore.doClearNotify()

    t('电波提醒.清除')
  }
}
