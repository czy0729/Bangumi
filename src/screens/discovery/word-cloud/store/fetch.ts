/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:05:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-03 06:53:44
 */
import { collectionStore, rakuenStore, subjectStore, usersStore } from '@stores'
import { getTimestamp } from '@utils'
import { get, update } from '@utils/kv'
import { D, DEV } from '@constants'
import Computed from './computed'

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
  fetchCollection = async () => {
    await collectionStore.init('userCollections')

    const { subjectType } = this.state
    if (!collectionStore.userCollections(this.userId, subjectType, 'wish')._loaded) {
      this.setState({
        fetchingCollections: true
      })

      const query = {
        subjectType,
        type: 'wish',
        userId: this.userId
      } as const
      await collectionStore.fetchUserCollections(query, true)
      for (let i = 1; i < 10; i += 1) {
        await collectionStore.fetchUserCollections(query, false)
      }
    }

    if (!collectionStore.userCollections(this.userId, subjectType, 'do')._loaded) {
      this.setState({
        fetchingCollections: true
      })

      const query = {
        subjectType,
        type: 'do',
        userId: this.userId
      } as const
      await collectionStore.fetchUserCollections(query, true)
      for (let i = 1; i < 10; i += 1) {
        await collectionStore.fetchUserCollections(query, false)
      }
    }

    if (!collectionStore.userCollections(this.userId, subjectType, 'collect')._loaded) {
      this.setState({
        fetchingCollections: true
      })

      const query = {
        subjectType,
        type: 'collect',
        userId: this.userId
      } as const
      await collectionStore.fetchUserCollections(query, true)
      for (let i = 1; i < 20; i += 1) {
        await collectionStore.fetchUserCollections(query, false)
      }
    }

    this.setState({
      fetchingCollections: false
    })
    return true
  }
}
