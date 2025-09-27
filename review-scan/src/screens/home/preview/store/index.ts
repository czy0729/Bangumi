/*
 * @Author: czy0729
 * @Date: 2022-10-21 12:31:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-07 01:48:54
 */
import { WEB } from '@constants'
import Fetch from './fetch'
import { EXCLUDE_STATE, RESET_STATE, STATE } from './ds'

export default class ScreenPreview extends Fetch {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(
      this.namespace
    )
    this.setState({
      ...storageData,
      _loaded: true
    })

    if (!this.state.epsThumbs.length) {
      if (WEB) {
        this.getThirdParty()
      } else {
        this.fetchMovieFromDouban()
      }
    }
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
