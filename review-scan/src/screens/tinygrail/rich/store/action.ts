/*
 * @Author: czy0729
 * @Date: 2025-07-08 16:12:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-08 16:28:47
 */
import { t } from '@utils/fetch'
import Fetch from './fetch'

export default class Action extends Fetch {
  onChange = (page: number) => {
    if (page === this.state.page) return

    this.setState({
      page
    })
    this.tabChangeCallback(page)
    this.save()

    t('番市首富.标签页切换', {
      page
    })
  }

  tabChangeCallback = (page: number) => {
    const key = this.key(page)
    if (!this.rich(key)._loaded) this.fetchRich(key)
  }
}
