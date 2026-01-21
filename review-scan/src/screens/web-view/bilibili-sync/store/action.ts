/*
 * @Author: czy0729
 * @Date: 2024-09-14 15:48:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 18:06:47
 */
import { feedback, getTimestamp } from '@utils'
import { t } from '@utils/fetch'
import { request } from '@utils/fetch.v0'
import { get } from '@utils/protobuf'
import { t2s } from '@utils/thirdParty/cn-char'
import { Id, SubjectId } from '@types'
import { HOST_API, MEDIA_SUBJECT } from '../ds'
import { BilibiliItem, Reviews } from '../types'
import Fetch from './fetch'

export default class Action extends Fetch {
  onToggleHide = () => {
    this.setState({
      hide: !this.state.hide
    })
  }

  onPage = (page: BilibiliItem[]) => {
    const subjectIds = page.filter(item => item.subjectId).map(item => item.subjectId)
    this.fetchCollections(subjectIds)
  }

  setData = (list: BilibiliItem[]) => {
    this.setState({
      data: {
        list: list.map(item => ({
          subjectId: (MEDIA_SUBJECT[item.id] ||
            (get('bangumi-data') || []).find(i => {
              let flag = i?.s?.b === item.id
              if (!flag) flag = i?.s?.bhmt === item.id
              if (!flag) {
                if (item.title.includes('（僅限港澳台地區）')) {
                  flag = i?.c === t2s(item.title.replace('（僅限港澳台地區）', ''))
                } else {
                  flag = i?.c === item.title
                }
              }
              return flag
            })?.id ||
            '') as SubjectId,
          ...item
        })),
        _loaded: getTimestamp()
      }
    })
    this.save()

    t('bili同步.获取成功', {
      length: list.length,
      userId: this.userId
    })
  }

  setReviews = (reviews: Reviews) => {
    this.setState({
      reviews
    })
    this.save()
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

    t('bili同步.置底')
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

    t('bili同步.同步')
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
