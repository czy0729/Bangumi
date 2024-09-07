/*
 * @Author: czy0729
 * @Date: 2022-10-21 12:31:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-07 01:48:54
 */
import { WEB } from '@constants'
import Fetch from './fetch'

class ScreenPreview extends Fetch {
  init = async () => {
    this.setState({
      ...(await this.getStorage(this.namespace)),
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
}

export default ScreenPreview
