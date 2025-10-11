/*
 * @Author: czy0729
 * @Date: 2023-04-16 13:38:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-13 21:59:30
 */
import CryptoJS from 'crypto-js'
import { read } from '@utils/db'
import { get, update } from '@utils/kv'
import { APP_ID } from '@constants'
import { Actions, Origin, SubjectId } from '@types'
import UserStore from '../user'
import Fetch from './fetch'
import { getInt, getSubjectSnapshot } from './utils'
import { SubjectSnapshot } from './types'

export default class Action extends Fetch {
  /** 获取条目信息快照, 尽可能在其他数据中组装条目信息 */
  getSubjectSnapshot = async (subjectId: SubjectId): Promise<SubjectSnapshot | undefined> => {
    let subjectSnapShot: SubjectSnapshot
    let flag = false
    if (!flag) {
      await this.initSubjectV2([subjectId])

      const subjectV2 = this.subjectV2(subjectId)
      if (subjectV2._loaded && subjectV2.jp) {
        flag = true
        subjectSnapShot = getSubjectSnapshot(
          subjectV2.date,
          subjectV2.image,
          subjectV2.jp,
          subjectV2.cn,
          subjectV2.rating.score,
          subjectV2.rating.total,
          subjectV2.rank
        )
      }
    }

    if (!flag) {
      const last = getInt(subjectId)
      const key = `subject${last}` as const
      await this.init(key)

      const subject = this.subject(subjectId)
      if (subject._loaded && subject.name) {
        flag = true
        subjectSnapShot = getSubjectSnapshot(
          subject.air_date,
          subject.images.common,
          subject.name,
          subject.name_cn,
          subject.rating.score,
          subject.rating.total,
          subject.rank
        )
      }
    }

    if (!flag) {
      await this.init('subjectFromOSS')

      const subjectFromOSS = this.subjectFromOSS(subjectId)
      if (subjectFromOSS._loaded && subjectFromOSS.name) {
        flag = true
        subjectSnapShot = getSubjectSnapshot(
          subjectFromOSS.air_date,
          subjectFromOSS.images.common,
          subjectFromOSS.name,
          subjectFromOSS.name_cn,
          subjectFromOSS.rating.score,
          subjectFromOSS.rating.total,
          subjectFromOSS.rank
        )
      }
    }

    return subjectSnapShot
  }

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
    return update(
      `origin_${id}`,
      {
        content: CryptoJS.AES.encrypt(JSON.stringify(origin), APP_ID).toString()
      },
      true,
      true
    )
  }

  /** 恢复源头数据 */
  downloadOrigin = async () => {
    const { id } = UserStore.userInfo
    let content: string

    try {
      const data = await get(`origin_${id}`)
      if (typeof data?.content === 'string') {
        content = data.content
      } else {
        const data = await read({
          path: `origin/${id}.json`
        })
        if (typeof data?.content === 'string') content = data.content
      }
    } catch (error) {
      return false
    }
    if (!content) return false

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
