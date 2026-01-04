/*
 * @Author: czy0729
 * @Date: 2020-03-22 14:18:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-03 06:55:16
 */
import Fetch from './fetch'
import { NAMESPACE } from './ds'

import type { STATE } from './ds'

export default class ScreenBlogs extends Fetch {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      _loaded: true
    })

    return this.refresh()
  }

  refresh = () => {
    return this.fetchBlogs(true)
  }
}
