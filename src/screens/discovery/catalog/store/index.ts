/*
 * @Author: czy0729
 * @Date: 2020-01-02 16:52:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-11 07:55:46
 */
import { get } from '@utils/protobuf'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE } from './ds'

import type { STATE } from './ds'

export default class ScreenCatalog extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      loadedCatalog: !!get('catalog')?.length,
      _loaded: true
    })

    const { keyword } = this.params
    if (keyword) {
      this.onFilterChange('filterKey', keyword)
      return
    }

    return this.fetchCatalog()
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
