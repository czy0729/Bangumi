/*
 * @Author: czy0729
 * @Date: 2019-05-17 21:53:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-22 23:42:20
 */
import { getTimestamp } from '@utils'
import { D7, DEV, MODEL_SETTING_SERVER_STATUS, WEB } from '@constants'
import UserStore from '../user'
import Action from './action'
import { NAMESPACE } from './init'

class SystemStore extends Action {
  private _serverStatusId = null

  init = async () => {
    // 优先度: 高
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

    if (!WEB) {
      if (MODEL_SETTING_SERVER_STATUS.getLabel(this.setting.serverStatus) !== '不显示') {
        this.fetchServerStatus()

        if (!this._serverStatusId) {
          this._serverStatusId = setInterval(() => {
            this.fetchServerStatus()
          }, 90000)
        }
      }

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
