/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:33:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:15:45
 */
import {
  collectionStore,
  monoStore,
  subjectStore,
  systemStore,
  usersStore,
  userStore
} from '@stores'
import { getTimestamp, optimize, postTask, queue, titleCase } from '@utils'
import { logger } from '@utils/dev'
import { xhrCustom } from '@utils/fetch'
import { CDN_EPS, CDN_REC, D7, H1, M5, SITES } from '@constants'
import Extend from './fetch/extend'

import type { UserId } from '@types'
import type { RecData } from '../types'

/** 条目核心数据请求 */
export default class Fetch extends Extend {
  /**
   * 条目信息
   * @optimize 60s
   */
  fetchSubject = () => {
    if (this.subject._responseGroup !== 'large' && optimize(this.subject, M5)) {
      return this.subject
    }
    return subjectStore.fetchSubject(this.subjectId)
  }

  /** 网页的条目信息 (书籍只有网页端有数据源, 需要初始值) */
  fetchSubjectFromHTML = async (refresh: boolean = false, autoPrevent: boolean = true) => {
    if (!refresh && optimize(this.subjectFormHTML, M5)) return false

    const data = await subjectStore.fetchSubjectFromHTML(this.subjectId, autoPrevent)
    const { watchedEps, book } = data
    this.setState({
      watchedEps: watchedEps || '0',
      chap: book.chap || '0',
      vol: book.vol || '0'
    })
    return data
  }

  /** 用户每集收看进度 */
  fetchCollection = () => {
    return collectionStore.fetchCollection(this.subjectId)
  }

  /** 更新进度后刷新收藏状态与用户收视进度 (固定组合) */
  refreshProgress = () => {
    userStore.fetchCollectionSingle(this.subjectId)
    return userStore.fetchUserProgress(this.subjectId)
  }

  /** 条目留言 */
  fetchSubjectComments = async (refresh?: boolean, reverse?: boolean) => {
    const data = await subjectStore.fetchSubjectComments(
      {
        subjectId: this.subjectId,
        interest_type: this.state.filterStatus,
        version: this.state.filterVersion
      },
      refresh,
      reverse
    )
    this.updateCommentsThirdParty()
    return data
  }

  private _fetchTrackUsersInfo = false

  /** 更新追踪特定用户的用户信息 */
  fetchTrackUsersInfo = async (userIds: UserId[]) => {
    if (this._fetchTrackUsersInfo || !userIds.length) return false

    await usersStore.init('usersInfo')

    for (let i = 0; i < userIds.length; i += 1) {
      const userId = userIds[i]
      const users = usersStore.usersInfo(userId)
      if (!users._loaded) {
        const data = await usersStore.fetchUsers(userId)
        if (data.userId) {
          usersStore.updateUsersInfo({
            avatar: data.avatar,
            userId: data.userId,
            userName: data.userName
          })
        }
      }
    }

    this._fetchTrackUsersInfo = true
  }

  /** 追踪 */
  fetchTrackComments = () => {
    if (!this.subjectTypeValue) return false

    const userIds = systemStore.setting[`comment${titleCase(this.subjectTypeValue)}`]
    if (!userIds?.length) return false

    const fetchs = []
    const now = getTimestamp()
    userIds.forEach(userId => {
      const collection = collectionStore.usersSubjectCollection(userId, this.subjectId)
      if (!collection._loaded || now - Number(collection._loaded) >= H1) {
        fetchs.push(() => collectionStore.fetchUsersCollection(userId, this.subjectId))
      }
    })

    postTask(() => {
      this.fetchTrackUsersInfo(userIds)
    }, 0)

    return queue(fetchs, 1)
  }

  /** 获取单集播放源 */
  fetchEpsData = async () => {
    if (
      !systemStore.setting.showLegalSource ||
      this.type !== '动画' ||
      this.nsfw ||
      optimize(this.state.epsData, D7)
    ) {
      return false
    }

    const epsData = {
      _loaded: getTimestamp()
    }

    try {
      const { _response } = await xhrCustom({
        url: CDN_EPS(this.subjectId)
      })

      SITES.forEach(item => (epsData[item] = {}))
      JSON.parse(_response).eps.forEach((item: any, index: number) => {
        item.sites.forEach((i: any) => {
          if (SITES.includes(i.site)) epsData[i.site][index] = i.url
        })
      })
    } catch (error) {
      logger.error(this.namespace, 'fetchEpsData', error)
    }

    this.setState({
      epsData
    })
    this.save()
  }

  /** 获取推荐源 */
  fetchRec = async () => {
    if ((this.nsfw && userStore.isExtremeLimit) || optimize(this.state.recData, D7)) return false

    const recData: RecData = {
      data: [],
      _loaded: getTimestamp()
    }

    try {
      const { _response } = await xhrCustom({
        url: CDN_REC(this.subjectId)
      })

      const data = JSON.parse(_response)
      if (Array.isArray(data) && data?.length) recData.data = data
    } catch (error) {
      logger.error(this.namespace, 'fetchRec', error)
    }

    this.setState({
      recData
    })
    this.save()
  }

  /** 制作人员数据 */
  fetchPersons = () => {
    return monoStore.fetchPersons(this.subjectId)
  }
}
