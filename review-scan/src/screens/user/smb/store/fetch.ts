/*
 * @Author: czy0729
 * @Date: 2024-09-05 15:30:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 20:29:06
 */
import { collectionStore, subjectStore } from '@stores'
import { cnjp, desc, fixedSubjectInfo, getTimestamp, pick } from '@utils'
import { queue, t } from '@utils/fetch'
import { gets } from '@utils/kv'
import { MODEL_SUBJECT_TYPE, WEB } from '@constants'
import { SubjectId, SubjectTypeCn } from '@types'
import { DICT_ORDER, REG_AIRDATE } from '../ds'
import { ListItem, MergeListItem } from '../types'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 批量请求条目和收藏 */
  fetchInfos = async (refresh: boolean = false) => {
    if (WEB) return this.fetchInfosWeb()

    const { loading } = this.state
    if (loading) return

    const now = getTimestamp()
    const subjectFetchs = []
    const collectionFetchs = []
    this.subjectIds.forEach((subjectId, index) => {
      const subjectV2 = this.subjectV2(subjectId)
      if (
        refresh ||
        !subjectV2.id ||
        !subjectV2._loaded ||
        now - Number(subjectV2._loaded) >= 60 * 60
      ) {
        subjectFetchs.push(async () => {
          if (!this.state.loading) return

          this.setState({
            loading: `${index + 1} / ${this.subjectIds.length}`
          })

          return subjectStore.fetchSubjectV2(subjectId)
        })

        if (this.isLogin) {
          const { _loaded } = this.collection(subjectId)
          if (refresh || !_loaded || now - Number(_loaded) >= 60 * 5) {
            collectionFetchs.push(() => {
              return collectionStore.fetchCollection(subjectId)
            })
          }
        }
      }
    })

    this.setState({
      loading: true
    })

    t('SMB.请求条目', {
      length: subjectFetchs.length
    })
    await queue(subjectFetchs, 1)

    this.setState({
      loading: false
    })
    return queue(collectionFetchs)
  }

  /** [网页版] 批量请求条目 */
  fetchInfosWeb = async () => {
    const { loading } = this.state
    if (loading) return

    const { subjects } = this.state
    const fetchIds = []
    const now = getTimestamp()
    const distance = 60 * 60 * 12
    this.subjectIds.forEach(id => {
      const { _loaded } = subjects[id] || {}
      if (!_loaded || now - Number(_loaded) >= distance) {
        const { _loaded } = this.subjectOSS(id)
        if (!_loaded || now - Number(_loaded) >= distance) {
          fetchIds.push(`subject_${id}`)
        }
      }
    })
    if (!fetchIds.length) return true

    this.setState({
      loading: true
    })
    try {
      const picker = [
        'id',
        'name',
        'name_cn',
        'image',
        'rank',
        'rating',
        'totalEps',
        'info',
        'type',
        'tags'
      ]
      const data = await gets(fetchIds, picker)
      Object.entries(data).forEach(([key, item]) => {
        try {
          data[key] = pick(item, picker)

          data[key].jp = data[key].name
          delete data[key].name

          data[key].cn = data[key].name_cn
          delete data[key].name_cn

          data[key].eps = Number(data[key].totalEps) || ''
          delete data[key].totalEps

          if (data[key].info) {
            data[key].date = fixedSubjectInfo(data[key].info).match(REG_AIRDATE)?.[2] || ''
          }
          delete data[key].info

          if (Array.isArray(data[key]?.tags)) {
            data[key].tags = (
              data[key].tags as {
                name: string
                count?: string
              }[]
            )
              .filter(item => Number(item?.count) >= 25)
              .map(item => item.name)
          } else {
            delete data[key].tags
          }

          data[key]._loaded = getTimestamp()
        } catch (error) {}
      })

      this.setState({
        subjects: data
      })
      this.save()
    } catch (error) {}

    this.setState({
      loading: false
    })
    this.fetchCollectionsThenCacheTagsWeb()
    return true
  }

  /** [网页版] 批量请求收藏 */
  fetchCollectionsWeb = async () => {
    let flag = true
    setTimeout(() => {
      if (!flag) return

      this.setState({
        fetchingCollections: true
      })
    }, 1600)

    await collectionStore.fetchCollectionStatusQueue(this.pageList.map(item => item.subjectId))
    this.setState({
      fetchingCollections: false
    })
    flag = false

    return true
  }

  /** [网页版] 批量请求收藏后, 因涉及条目状态, 需要重新计算标签 */
  fetchCollectionsThenCacheTagsWeb = async () => {
    let flag = true
    setTimeout(() => {
      if (!flag) return

      this.setState({
        fetchingCollections: true
      })
    }, 1600)

    await collectionStore.fetchCollectionStatusQueue(this.subjectIds)
    this.setState({
      fetchingCollections: false
    })
    flag = false

    this.cacheTags()
    return true
  }

  /** 更新数据 */
  cacheList = () => {
    this.memoList = this.mergeList()
    this.cacheTags()
    this.cacheSubjectTags()

    if (WEB) this.fetchCollectionsWeb()
  }

  /** 更新标签数据 */
  cacheTags = () => {
    this.memoTags = this.tagsActions()
  }

  /** 更新条目标签数据 */
  cacheSubjectTags = () => {
    this.memoSubjectTags = this.tagsSubjectActions()
  }

  /** 统计标签数目 */
  tagsCount = () => {
    const data: Record<string, number> = {
      条目: 0,
      文件夹: 0
    }

    this.list().forEach(item => {
      const { subjectId } = item
      if (!subjectId) {
        data['文件夹'] += 1
      } else {
        data['条目'] += 1

        const { type, date } = this.subjectV2(subjectId)
        const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)
        if (typeCn) {
          if (!data[typeCn]) {
            data[typeCn] = 1
          } else {
            data[typeCn] += 1
          }
        }

        if (typeof date === 'string') {
          const year = date.slice(0, 4)
          if (year) {
            if (!data[year]) {
              data[year] = 1
            } else {
              data[year] += 1
            }
          }
        }

        const statusName =
          collectionStore.collect(subjectId) || this.collection(subjectId)?.status?.name || '未收藏'
        if (!data[statusName]) {
          data[statusName] = 1
        } else {
          data[statusName] += 1
        }

        item.tags.forEach(i => {
          if (!data[i]) {
            data[i] = 1
          } else {
            data[i] += 1
          }
        })
      }
    })
    return data
  }

  /** 对标签进行排序 */
  tagsActions = () => {
    const tagsCount = this.tagsCount()
    return Object.keys(tagsCount).sort((a, b) =>
      desc(DICT_ORDER[a] || tagsCount[a] || 0, DICT_ORDER[b] || tagsCount[b] || 0)
    )
  }

  /** 统计条目标签数目 */
  tagsSubjectCount = () => {
    const temp: Record<SubjectId, boolean> = {}
    const data: Record<string, number> = {}
    this.list().forEach(item => {
      const { subjectId } = item
      if (subjectId && !(subjectId in temp)) {
        temp[subjectId] = true

        const { tags } = this.subjectV2(subjectId)
        if (typeof tags?.forEach === 'function') {
          tags.forEach(
            (
              item:
                | string
                | {
                    name: string
                    count: number
                  }
            ) => {
              let tag = ''
              if (typeof item === 'string') {
                tag = item
              } else {
                tag = item?.name
              }

              if (tag) {
                if (!data[tag]) data[tag] = 0
                data[tag] += 1
              }
            }
          )
        }
      }
    })
    return data
  }

  /** 对标签进行排序 */
  tagsSubjectActions = () => {
    const tagsCount = this.tagsSubjectCount()
    return Object.keys(tagsCount).sort((a, b) => desc(tagsCount[a] || 0, tagsCount[b] || 0))
  }

  /** [1] 获取基础列表 */
  list = () => {
    const list: ListItem[] = []
    if (this.current?.list?.length) {
      this.current.list
        .slice()
        .sort((a, b) => {
          return desc(
            String(a.ids.length ? a.lastModified : ''),
            String(b.ids.length ? b.lastModified : '')
          )
        })
        .forEach(item => {
          if (item.ids.length) {
            item.ids.forEach(subjectId => {
              list.push({
                ...item,
                subjectId
              })
            })
          } else {
            list.push({
              ...item,
              subjectId: 0
            })
          }
        })
    }

    return list
  }

  /** [2] 基于 [1] 进行排序 */
  sortList = () => {
    const { sort } = this.state
    if (sort === '评分') {
      return this.list()
        .slice()
        .sort((a, b) => {
          const subjectA = this.subjectV2(a.subjectId || '')
          const subjectB = this.subjectV2(b.subjectId || '')
          return desc(
            Number(
              subjectA._loaded
                ? (subjectA?.rating?.score || 0) +
                    (subjectA?.rank ? 10000 - subjectA?.rank : -10000)
                : -9999
            ),
            Number(
              subjectB._loaded
                ? (subjectB?.rating?.score || 0) +
                    (subjectB?.rank ? 10000 - subjectB?.rank : -10000)
                : -9999
            )
          )
        })
    }

    if (sort === '评分人数') {
      return this.list()
        .slice()
        .sort((a, b) => {
          return desc(
            Number(this.subjectV2(a.subjectId || '')?.rating?.total || 0),
            Number(this.subjectV2(b.subjectId || '')?.rating?.total || 0)
          )
        })
    }

    if (sort === '名称') {
      return this.list()
        .slice()
        .sort((a, b) => {
          const subjectA = this.subjectV2(a.subjectId || '')
          const subjectB = this.subjectV2(b.subjectId || '')
          const nameA = cnjp(subjectA.cn, subjectA.jp) || ''
          const nameB = cnjp(subjectB.cn, subjectB.jp) || ''
          return nameA.localeCompare(nameB)
        })
    }

    if (sort === '文件夹修改时间') {
      return this.list().sort((a, b) => {
        return desc(String(b.lastModified || ''), String(a.lastModified || ''))
      })
    }

    // 时间
    return this.list()
      .slice()
      .sort((a, b) => {
        return desc(
          String(this.airDate(b.subjectId || '')),
          String(this.airDate(a.subjectId || ''))
        )
      })
  }

  /** [3] 基于 [2] 进行标签筛选 */
  tagList = () => {
    const { tags } = this.state
    if (!tags.length) return this.sortList()

    return this.sortList().filter(item => {
      const { subjectId } = item
      let flag: boolean
      if (tags.includes('条目')) {
        flag = !!subjectId
      } else if (tags.includes('文件夹')) {
        flag = !subjectId
      }

      if (!flag) {
        flag = item.tags.some(tag => tags.includes(tag))
      }

      if (!flag) {
        const { type } = this.subjectV2(subjectId)
        const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)
        flag = !!subjectId && tags.includes(typeCn)
      }

      if (!flag) {
        flag =
          !!subjectId &&
          tags.includes(
            collectionStore.collect(subjectId) ||
              this.collection(subjectId)?.status?.name ||
              '未收藏'
          )
      }

      if (!flag && /\d{4}/.test(tags[0])) {
        const { date } = this.subjectV2(subjectId)
        flag = !!date && date.includes(tags[0])
      }

      return flag
    })
  }

  /** [4] 基于 [3] 进行条目标签筛选 */
  subjectTagList = () => {
    const { subjectTags } = this.state
    if (!subjectTags.length) return this.tagList()

    return this.tagList().filter(item => {
      const { subjectId } = item
      if (!subjectId) return false

      const { tags } = this.subjectV2(subjectId)
      return tags.some(
        (
          tag:
            | string
            | {
                name: string
                count: number
              }
        ) => {
          if (typeof tag === 'string') return subjectTags.includes(tag)
          if (tag?.name) return subjectTags.includes(tag?.name)
          return false
        }
      )
    })
  }

  /** [5] 基于 [4] 进行搜索 */
  filterList = () => {
    const { filter } = this.state
    if (!filter) return this.subjectTagList()

    return this.subjectTagList().filter(item => {
      // 文件夹
      if (!item.subjectId) return item.name.includes(filter)

      const { cn = '', jp = '' } = this.subjectV2(item.subjectId)
      return cn.includes(filter) || jp.includes(filter)
    })
  }

  /** [6] 基于 [5] 合并同条目项 */
  mergeList = () => {
    const indexMap: Record<SubjectId, number> = {}
    const list: MergeListItem[] = []
    this.filterList().forEach(item => {
      const { subjectId } = item
      if (!subjectId || !(subjectId in indexMap)) {
        list.push(item)
        indexMap[subjectId] = list.length - 1
        return
      }

      // 使用新的 merge 归并同类项
      const index = indexMap[subjectId]
      if (list[index].merge) {
        list[index].merge.push(item)
      } else {
        list[index] = {
          ...list[index],
          merge: [item]
        }
      }
    })
    return list
  }
}
