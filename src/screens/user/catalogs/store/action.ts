/*
 * @Author: czy0729
 * @Date: 2024-09-13 05:38:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 05:39:38
 */
import { t } from '@utils/fetch'
import { TABS } from '../ds'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 标签页切换 */
  onChange = (page: number) => {
    if (page === this.state.page) return

    this.setState({
      page
    })
    this.save()
    this.tabChangeCallback(page)

    t('用户目录.标签页切换')
  }

  /** 标签页切换回调 */
  tabChangeCallback = (page: number) => {
    const { key } = TABS[page]
    if (!this.catalogs(key)._loaded) this.fetchCatalogs(key, true)
  }
}
