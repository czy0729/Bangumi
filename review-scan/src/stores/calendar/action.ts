/*
 * @Author: czy0729
 * @Date: 2023-04-24 14:06:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-24 14:07:22
 */
import { toJS } from 'mobx'
import { read } from '@utils/db'
import { get, update } from '@utils/kv'
import { SubjectId } from '@types'
import UserStore from '../user'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 更新用户自定义放送时间 */
  updateOnAirUser = (subjectId: SubjectId, weekDayCN: string | number, timeCN: string) => {
    if (!subjectId) return

    const key = 'onAirUser'
    this.setState({
      [key]: {
        [subjectId]: {
          weekDayCN,
          timeCN,
          _loaded: 1
        }
      }
    })
    this.save(key)
  }

  /** 删除自定义放送时间 */
  resetOnAirUser = (subjectId: SubjectId) => {
    const { onAirUser } = this.state
    const _onAirUser = toJS(onAirUser)
    delete _onAirUser[subjectId]

    const key = 'onAirUser'
    this.clearState(key, _onAirUser)
    this.save(key)
  }

  /** 上传用户自定义放送数据到云端 */
  uploadSetting = () => {
    if (!Object.keys(this.state.onAirUser).length) return false

    const { id } = UserStore.userInfo
    return update(`onair_user_${id}`, this.state.onAirUser)
  }

  /** 恢复到云端的用户自定义放送数据 */
  downloadSetting = async () => {
    const { id } = UserStore.userInfo
    let onAirUser: typeof this.state.onAirUser

    try {
      const data = await get(`onair_user_${id}`)
      if (data) {
        onAirUser = data
      } else {
        const data = await read({
          path: `onair-user/${id}.json`
        })
        if (!data?.content) return false

        onAirUser = JSON.parse(data.content)
      }
    } catch (error) {
      return false
    }
    if (!onAirUser || typeof onAirUser !== 'object') return false

    try {
      const key = 'onAirUser'
      this.setState({
        [key]: {
          ...onAirUser,
          ...this.state.onAirUser
        }
      })
      this.save(key)
      return true
    } catch (error) {
      return false
    }
  }
}
