/*
 * @Author: czy0729
 * @Date: 2020-03-22 14:18:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 06:54:02
 */
import Fetch from './fetch'
import { NAMESPACE, STATE } from './ds'

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
