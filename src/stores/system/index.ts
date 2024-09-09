/*
 * @Author: czy0729
 * @Date: 2019-05-17 21:53:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-09 16:56:52
 */
import { getTimestamp } from '@utils'
import { D7, DEV, WEB } from '@constants'
import UserStore from '../user'
import Action from './action'
import { NAMESPACE } from './init'

class SystemStore extends Action {
  init = async () => {
    await this.readStorage(
      [
        'advance',
        'advanceDetail',
        'dev',
        'devEvent',
        'iosUGCAgree',
        'ota',
        'release',
        'setting',
        't'
      ],
      NAMESPACE
    )

    // 优先度: 高
    if (!WEB) {
      // 优先度: 中
      setTimeout(() => {
        this.setState({
          rendered: true
        })

        if (!DEV) this.fetchRelease()

        const now = getTimestamp()
        if (this.advance && now - this.advanceDetail._loaded >= D7) {
          this.fetchAdvanceDetail()
        }

        this.resetCDN()
        if (this.setting.onlineStatus) UserStore.fetchOnlines()
      }, 8000)
    }

    return true
  }
}

const systemStore = new SystemStore()

export type SystemStoreType = typeof systemStore

export default systemStore
