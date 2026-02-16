/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:05:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-13 09:19:09
 */
import dayjs from 'dayjs'
import { rakuenStore, subjectStore, usersStore } from '@stores'
import { cnjp, feedback, getTimestamp, info } from '@utils'
import { request } from '@utils/fetch.v0'
import { API_COLLECTIONS } from '@utils/fetch.v0/ds'
import { Collection } from '@utils/fetch.v0/types'
import { get, update } from '@utils/kv'
import { D, DEV, MODEL_SUBJECT_TYPE } from '@constants'
import Computed from './computed'
import { COLLECTION_STATUS } from './ds'

export default class Fetch extends Computed {
  /** 分词快照 */
  fetchSnapshot = async () => {
    if (!this.id) return false

    const now = getTimestamp()
    const { data } = this.state
    if (data._loaded && data.list?.length) {
      if (now - Number(data._loaded) <= D) return true
    }

    try {
      const snapshot = await get(this.snapshotId)
      if (snapshot?.data?._loaded && snapshot?.data?.list?.length) {
        if (now - Number(snapshot.data._loaded) <= D) {
          this.setState({
            data: {
              list: snapshot.data.list,
              _loaded: now
            }
          })
          return this.state.data.list.length >= 20
        }
      }
    } catch (error) {}

    return false
  }

  /** 获取趋势 */
  fetchTrend = async () => {
    if (!this.id || this.userId) return false

    try {
      const trend = await get(this.trendId)
      if (typeof trend?.value === 'number') {
        this.setState({
          trend: Number(trend.value + 1) || 1
        })
      } else {
        this.setState({
          trend: 1
        })
      }

      if (DEV) return

      update(
        this.trendId,
        {
          value: Number(this.state.trend || 1)
        },
        true,
        true
      )
    } catch (error) {}

    return false
  }

  /** 条目留言 */
  fetchSubjectComments = async (refresh?: boolean) => {
    return subjectStore.fetchSubjectComments(
      {
        subjectId: this.subjectId,
        interest_type: '',
        version: false
      },
      refresh
    )
  }

  /** 获取帖子内容和留言 */
  fetchTopic = () => {
    return rakuenStore.fetchTopic({
      topicId: this.topicId
    })
  }

  /** 获取角色内容和留言 */
  fetchMono = () => {
    return subjectStore.fetchMono({
      monoId: this.monoId
    })
  }

  /** 获取用户信息 */
  fetchUser = () => {
    return usersStore.fetchUsers({
      userId: this.userId
    })
  }

  /** 获取用户收藏 */
  fetchCollectionV0 = async (refresh: boolean = false) => {
    const { collections, subjectType } = this.state
    const subjectTypeValue = MODEL_SUBJECT_TYPE.getValue(subjectType)
    const key = `${this.userId}|${subjectType}`
    if (!refresh && collections[key]?.length) return false

    this.setState({
      fetchingCollections: true
    })

    const list: Collection['data'] = []
    try {
      for (const item of COLLECTION_STATUS) {
        for (let i = 1; i <= item.page; i += 1) {
          const response = await request<Collection>(
            API_COLLECTIONS(this.userId, subjectTypeValue, i, 100, item.value),
            undefined,
            {
              timeout: 8000,
              onError: () => {}
            }
          )
          if (Array.isArray(response?.data)) list.push(...response.data)
          if ((response?.offset || 0) + (response?.limit || 100) >= (response?.total || 100)) break
        }
      }
    } catch (error) {
      info('部分请求发生错误, 请重试')
    }

    const data = list
      .filter(item => !!item)
      .map(item => ({
        id: item.subject_id,
        name: cnjp(item.subject?.name_cn, item.subject?.name) || '',
        cover: item.subject?.images?.large || '',
        tags: item.tags || [],
        score: item.rate || 0,
        time: dayjs(item.updated_at).format('YYYY-MM-DD') || ''
      }))
    if (data.length) {
      this.setState({
        collections: {
          ...collections,
          [key]: data
        }
      })
      this.save()

      feedback()
      info(`索引到 ${data.length} 个收藏`)
    }

    this.setState({
      fetchingCollections: false
    })
  }
}
