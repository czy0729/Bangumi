/*
 * @Author: czy0729
 * @Date: 2024-09-16 14:17:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 14:18:55
 */
import { feedback } from '@utils'
import { t } from '@utils/fetch'
import { request } from '@utils/fetch.v0'
import { Id, SubjectId } from '@types'
import { HOST_API } from '../ds'
import { DoubanItem } from '../types'
import Fetch from './fetch'

export default class Action extends Fetch {
  onChange = (doubanId: string) => {
    this.setState({
      doubanId: doubanId.trim()
    })
  }

  onPage = (page: DoubanItem[]) => {
    this.fetchCollections(page.filter(item => item.subjectId).map(item => item.subjectId))

    // 只查询没有进度和看过的条目
    this.fetchTotalEps(
      page
        .filter(item => item.subjectId && !item.progress && item.status === 3)
        .map(item => item.subjectId)
    )
  }

  onBottom = (mediaId: Id) => {
    const { bottom } = this.state
    const current = bottom.current + 1
    this.setState({
      bottom: {
        current,
        [mediaId]: current
      }
    })
    this.save()

    t('豆瓣同步.置底')
  }

  onSubmit = async (
    subjectId: SubjectId,
    collectionData?: {
      status?: any
      rating?: any
      comment?: any
      ep?: any
    },
    epData?: {
      ep?: number
    }
  ) => {
    if (!subjectId) return false

    if (Object.keys(collectionData).length) {
      const { privacy } = this.state
      await request(`${HOST_API}/collection/${subjectId}/update`, {
        ...collectionData,
        privacy: privacy ? 1 : 0
      })
    }

    if (Object.keys(epData).length) {
      await request(`${HOST_API}/subject/${subjectId}/update/watched_eps`, {
        watched_eps: epData.ep || 0
      })
    }

    await this.fetchCollection(subjectId)
    feedback()

    t('豆瓣同步.同步')
  }

  onToggle = async (key: string) => {
    this.setState({
      [key]: !this.state[key]
    })
    this.save()
  }

  onRefreshCollection = (subjectId: SubjectId) => {
    this.setState({
      collections: {
        [subjectId]: {
          ...(this.collection(subjectId) || {}),
          loaded: 0
        }
      }
    })

    setTimeout(() => {
      this.fetchCollection(subjectId)
    }, 0)
  }
}
