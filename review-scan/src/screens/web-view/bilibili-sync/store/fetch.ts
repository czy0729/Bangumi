/*
 * @Author: czy0729
 * @Date: 2024-09-14 15:44:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 15:47:20
 */
import { getTimestamp, info } from '@utils'
import { queue } from '@utils/fetch'
import { request } from '@utils/fetch.v0'
import { decode } from '@utils/protobuf'
import i18n from '@constants/i18n'
import { SubjectId } from '@types'
import { HOST_API, LOADED } from '../ds'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 加载 bangumi-data */
  fetchBangumiData = async () => {
    if (this.state.loadedBangumiData) return

    await decode('bangumi-data')
    this.setState({
      loadedBangumiData: true
    })
  }

  fetchCollection = async (subjectId: SubjectId) => {
    const collections = {}
    const data: any = await request(`${HOST_API}/collection/${subjectId}`)
    if (data?.status) {
      collections[subjectId] = {
        status: data.status.type,
        ep_status: data.ep_status,
        private: data.private,
        rating: data.rating,
        comment: data.comment,
        loaded: getTimestamp()
      }
    } else {
      collections[subjectId] = {
        loaded: getTimestamp()
      }
    }
    this.setState({
      collections
    })
    this.save()
  }

  fetchCollections = async (subjectIds: SubjectId[] = []) => {
    if (!this.userId) {
      info(`此功能依赖收藏数据，请先${i18n.login()}`, 4)
      return false
    }

    const collections = {}
    const fetchs = []
    subjectIds.forEach(subjectId => {
      if (LOADED[subjectId]) return

      LOADED[subjectId] = true
      fetchs.push(async () => {
        const data: any = await request(`${HOST_API}/collection/${subjectId}`)
        if (data?.status) {
          collections[subjectId] = {
            status: data.status.type,
            ep_status: data.ep_status,
            private: data.private,
            rating: data.rating,
            comment: data.comment,
            loaded: getTimestamp()
          }
        } else {
          collections[subjectId] = {
            loaded: getTimestamp()
          }
        }
        return true
      })
    })

    await queue(fetchs, 2)
    this.setState({
      collections
    })
    this.save()
  }
}
