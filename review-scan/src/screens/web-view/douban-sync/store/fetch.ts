/*
 * @Author: czy0729
 * @Date: 2024-09-16 14:13:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 14:17:38
 */
import { desc, feedback, getTimestamp, info, sleep } from '@utils'
import { queue, t, xhrCustom } from '@utils/fetch'
import { request } from '@utils/fetch.v0'
import { HOST_DB_M } from '@constants'
import i18n from '@constants/i18n'
import { loadJSON } from '@assets/json'
import { SubjectId } from '@types'
import { HOST_API, LOADED, LOADED_TOTAL_EPS } from '../ds'
import { DoubanCollection, DoubanStatus } from '../types'
import Computed from './computed'
import { EXCLUDE_STATE } from './ds'

export default class Fetch extends Computed {
  fetchDouban = async (
    status: DoubanStatus = 'done',
    page: number = 1,
    message: boolean = true
  ) => {
    if (!this.doubanId) {
      if (message) info('匹配豆瓣 ID 有误，请核实')
      return false
    }

    const limit = 40
    const start = (page - 1) * limit
    try {
      this.setState({
        progress: {
          fetching: true
        }
      })

      const { _response } = await xhrCustom({
        url: `${HOST_DB_M}/rexxar/api/v2/user/${this.doubanId}/interests?type=movie&status=${status}&start=${start}&count=${limit}&ck=PylB&for_mobile=1`,
        headers: {
          Referer: HOST_DB_M
        }
      })
      const { interests = [], total } = JSON.parse(_response) as DoubanCollection
      const doubanData = await loadJSON('thirdParty/d.min')
      interests.forEach(item => {
        this.collections.push({
          id: item.subject?.id,
          subjectId: doubanData[item.subject?.id] || 0,
          title: item.subject?.title,
          cover: item.subject?.pic?.normal || '',
          status: item.status === 'mark' ? 1 : item.status === 'doing' ? 2 : 3,
          progress: item.status === 'done' ? (item.subject?.type === 'movie' ? '1话' : 0) : 0,
          content: item.comment || '',
          score: item?.rating?.value || 0,
          create_time: item.create_time || '0'
        })
      })
      await sleep()

      const cnStatus = status === 'mark' ? '想看' : status === 'doing' ? '在看' : '看过'
      this.setState({
        progress: {
          fetching: true,
          message: `正在获取${cnStatus}收藏`,
          current: page,
          total: Math.floor(total / limit) + 1
        }
      })

      const end = page * limit
      if (end < total) {
        this.fetchDouban(status, page + 1)
      } else if (status === 'done') {
        this.fetchDouban('doing', 1)
      } else if (status === 'doing') {
        this.fetchDouban('mark', 1)
      } else {
        this.onToggleHide()
        this.setState({
          data: {
            list: this.collections.slice().sort((a, b) => desc(a.create_time, b.create_time)),
            _loaded: getTimestamp()
          },
          progress: EXCLUDE_STATE.progress
        })

        info(`已获取 ${this.collections.length} 个收藏`)
        feedback()
        t('豆瓣同步.获取成功', {
          length: this.collections.length,
          userId: this.userId
        })

        this.collections = []
        this.save()
      }
    } catch (error) {
      info('获取数据出错，请检查')
      feedback()
      this.setState({
        progress: EXCLUDE_STATE.progress
      })
    }
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

  /** 豆瓣数据没有总集数，若条目为看过，需要额外获取条目的总集数然后一并全部标记 */
  fetchTotalEps = async (subjectIds: SubjectId[] = []) => {
    const totalEps = {}
    const fetchs = []

    subjectIds.forEach(subjectId => {
      if (LOADED_TOTAL_EPS[subjectId]) return

      LOADED_TOTAL_EPS[subjectId] = true
      fetchs.push(async () => {
        try {
          const data: any = await request(
            `${HOST_API}/v0/subjects/${subjectId}?responseGroup=small`
          )
          if (data?.total_episodes || data?.eps) {
            totalEps[subjectId] = data?.total_episodes || data?.eps || 0
          }
        } catch (error) {}

        return true
      })
    })

    await queue(fetchs, 2)
    this.setState({
      totalEps
    })
    this.save()
  }

  onToggleHide = () => {
    this.setState({
      hide: !this.state.hide
    })
    this.save()
  }
}
