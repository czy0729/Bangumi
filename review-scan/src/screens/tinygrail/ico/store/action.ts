/*
 * @Author: czy0729
 * @Date: 2025-01-14 06:58:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-14 07:01:58
 */
import { t } from '@utils/fetch'
import { TABS } from '../ds'
import Fetch from './fetch'
import { NAMESPACE } from './ds'

export default class Action extends Fetch {
  onChange = (page: number) => {
    if (page === this.state.page) return

    this.setState({
      page
    })
    this.saveStorage(NAMESPACE)
    this.tabChangeCallback(page)

    t('ICO.标签页切换', {
      page
    })
  }

  tabChangeCallback = (page: number) => {
    const { title, key } = TABS[page]
    if (!this.list(key)._loaded || title === '最近活跃') this.fetchList(key)
  }
}
