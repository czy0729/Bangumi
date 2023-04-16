/*
 * @Author: czy0729
 * @Date: 2023-04-16 13:38:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-16 13:40:48
 */
import CryptoJS from 'crypto-js'
import { put, read } from '@utils/db'
import { APP_ID } from '@constants'
import { Actions, Origin } from '@types'
import UserStore from '../user'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 更新源头数据 */
  updateOrigin = (data: Origin) => {
    const key = 'origin'
    this.setState({
      [key]: data
    })
    this.save(key)
  }

  /** 上传源头数据到云端 */
  uploadOrigin = () => {
    const { id } = UserStore.userInfo
    const { origin } = this.state
    return put({
      path: `origin/${id}.json`,
      content: CryptoJS.AES.encrypt(JSON.stringify(origin), APP_ID).toString()
    })
  }

  /** 恢复源头数据 */
  downloadOrigin = async () => {
    const { id } = UserStore.userInfo
    const { content } = await read({
      path: `origin/${id}.json`
    })

    if (!content) {
      return false
    }

    try {
      const bytes = CryptoJS.AES.decrypt(content.toString(), APP_ID)
      const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      if (typeof data?.base === 'object' && typeof data?.custom === 'object') {
        const key = 'origin'
        this.setState({
          [key]: {
            base: data.base,
            custom: data.custom
          }
        })
        this.save(key)
        return true
      }

      return false
    } catch (error) {
      return false
    }
  }

  /** 更新跳转数据 */
  updateActions = (data: Actions) => {
    const key = 'actions'
    this.setState({
      [key]: data
    })
    this.save(key)
  }
}
