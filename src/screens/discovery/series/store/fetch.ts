/*
 * @Author: czy0729
 * @Date: 2024-11-30 19:34:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 19:44:06
 */
import { toJS } from 'mobx'
import { systemStore } from '@stores'
import { asc, cnjp, desc, getTimestamp, info } from '@utils'
import { queue } from '@utils/fetch'
import { request } from '@utils/fetch.v0'
import i18n from '@constants/i18n'
import { SubjectId } from '@types'
import { DISTANCE, HOST_API_V0, LIMIT, RELATIONS, SUBJECT_TYPE } from '../ds'
import Computed from './computed'
import { EXCLUDE_STATE } from './ds'

const loaded = {}

let indexes = {}

export default class Fetch extends Computed {
  /** 建立系列关系列表 */
  calculateData = () => {
    const { relations } = this.state
    const data = []

    Object.keys(relations)
      .sort((a, b) => desc(a, b))
      .forEach(id => {
        const ids = [Number(id), ...relations[id]]
        const find = ids.find(id => id in indexes)
        if (!find) {
          data.push(ids)
          ids.forEach(id => {
            indexes[id] = data.length - 1
          })
        } else {
          data[indexes[find]].push(...ids)
        }
      })

    this.setState({
      data: data.map(item => Array.from(new Set(item)).sort((a, b) => asc(a, b))),
      _loaded: getTimestamp()
    })
  }

  /** 组织请求构成关联系列数据 */
  fetchSeries = async () => {
    if (this.state.fetching) return false

    indexes = {}

    // 先加载第一层关系数据
    await this.fetchCollections()
    await this.fetchRelations()
    this.calculateData()

    setTimeout(async () => {
      // 稍后加载第二层关系数据
      await this.fetchSubRelations()
      this.calculateData()
      this.fetchSomeSubjects()

      setTimeout(() => {
        // 因为关联到的条目也可能存在其他收藏状态, 需要请求补全
        this.fetchOtherCollections()
      }, 4000)
    }, 1600)
  }

  /** 在看和看过的收藏 */
  fetchCollections = async () => {
    if (!this.userId) {
      info(`此功能依赖收藏数据，请先${i18n.login()}`, 4)
      return false
    }

    this.setState({
      fetching: true,
      message: '获取用户收藏',
      current: 1,
      total: 2
    })

    const _data = []

    // 看过
    let data = await request<any>(
      `${HOST_API_V0}/users/${this.userId}/collections?subject_type=${SUBJECT_TYPE}&type=2&limit=${LIMIT}`
    )
    if (Array.isArray(data?.data)) {
      _data.push(...data?.data)

      // 非高级会员只请求1页
      if (systemStore.advance) {
        // 最多请求5页
        if (data?.total > 100) {
          for (let i = 2; i <= Math.min(Math.ceil(data.total / LIMIT), 5); i += 1) {
            data = await request(
              `${HOST_API_V0}/users/${
                this.userId
              }/collections?subject_type=${SUBJECT_TYPE}&type=2&offset=${
                (i - 1) * LIMIT
              }&limit=${LIMIT}`
            )
            _data.push(...data?.data)
          }
        }
      }
    }

    this.setState({
      current: 2
    })

    // 在看最多请求1页
    data = await request<any>(
      `${HOST_API_V0}/users/${this.userId}/collections?subject_type=${SUBJECT_TYPE}&type=3&limit=${LIMIT}`
    )
    if (Array.isArray(data?.data)) _data.push(...data?.data)

    if (!_data.length) return false

    this.setState({
      collections: _data
        .slice()
        .sort((a, b) => desc(a.updated_at, b.updated_at))
        .map(item => ({
          id: item.subject_id,
          type: item.type,
          ep: item.ep_status,
          updated_at: item.updated_at
        }))
    })
    this.setState({
      ...EXCLUDE_STATE
    })

    this.save()
    return true
  }

  /** 想看、搁置和抛弃的收藏 */
  fetchOtherCollections = async () => {
    const _data = []

    // 想看
    let data = await request<any>(
      `${HOST_API_V0}/users/${this.userId}/collections?subject_type=${SUBJECT_TYPE}&type=1&limit=${LIMIT}`
    )
    if (Array.isArray(data?.data)) _data.push(...data?.data)

    // 搁置
    data = await request<any>(
      `${HOST_API_V0}/users/${this.userId}/collections?subject_type=${SUBJECT_TYPE}&type=4&limit=${LIMIT}`
    )
    if (Array.isArray(data?.data)) _data.push(...data?.data)

    // 抛弃
    data = await request<any>(
      `${HOST_API_V0}/users/${this.userId}/collections?subject_type=${SUBJECT_TYPE}&type=5&limit=${LIMIT}`
    )
    if (Array.isArray(data?.data)) _data.push(...data?.data)

    if (!_data.length) return false

    this.setState({
      otherCollections: _data
        .slice()
        .sort((a, b) => desc(a.updated_at, b.updated_at))
        .map(item => ({
          id: item.subject_id,
          type: item.type,
          ep: item.ep_status,
          updated_at: item.updated_at
        }))
    })

    this.save()
  }

  /** 关联条目 */
  fetchRelations = async () => {
    const relations = {}
    const fetchs = []

    this.subjectIds.forEach(subjectId => {
      fetchs.push(async () => {
        const data = await request(`${HOST_API_V0}/subjects/${subjectId}/subjects`)

        if (!Array.isArray(data)) {
          relations[subjectId] = []
          return false
        }

        relations[subjectId] = data
          .filter(item => SUBJECT_TYPE === item.type && RELATIONS.includes(item.relation))
          .sort((a, b) => asc(a.id, b.id))
          .map(item => item.id)
        return true
      })
    })

    await queue(
      fetchs.map(fn => async () => {
        await fn()
        this.setState({
          fetching: true,
          message: '获取条目关系',
          current: this.state.current + 1,
          total: fetchs.length
        })
        return true
      }),
      2
    )

    this.clearState('relations', relations)
    this.save()
    return true
  }

  /** 二级关联条目 */
  fetchSubRelations = async () => {
    const relations = {
      ...this.state.relations
    }
    const fetchs = []

    Object.keys(relations).forEach(subjectId => {
      const relation = relations[subjectId]
      relation.forEach(sub => {
        if (relations[sub]) return

        fetchs.push(async () => {
          const data = await request(`${HOST_API_V0}/subjects/${sub.id}/subjects`)

          if (!Array.isArray(data)) {
            relations[sub] = []
            return false
          }

          relations[sub] = data
            .filter(item => SUBJECT_TYPE === item.type && RELATIONS.includes(item.relation))
            .sort((a, b) => asc(a.id, b.id))
            .map(item => item.id)

          return true
        })
      })
    })

    this.setState({
      fetching: true,
      message: '获取二级条目关系',
      current: 0,
      total: fetchs.length
    })
    await queue(
      fetchs.map(fn => async () => {
        await fn()
        this.setState({
          fetching: true,
          message: '获取二级条目关系',
          current: this.state.current + 1,
          total: fetchs.length
        })
        return true
      }),
      2
    )
    this.setState({
      relations
    })

    setTimeout(() => {
      this.setState({
        ...EXCLUDE_STATE
      })
    }, 1600)

    this.save()
    return true
  }

  /** 条目信息 */
  fetchSubjects = async (subjectIds: SubjectId[] = []) => {
    if (!subjectIds.length) return false

    const now = getTimestamp()
    const fetchs = []

    subjectIds.forEach(subjectId => {
      if (loaded[subjectId]) return true

      const subject = this.subject(subjectId)
      if (subject._loaded && now - subject._loaded <= DISTANCE) return true

      loaded[subjectId] = true
      fetchs.push(async () => {
        const data = await request<any>(`${HOST_API_V0}/subjects/${subjectId}`)
        if (!data?.id) return false

        this.setState({
          subjects: {
            [subjectId]: {
              id: subjectId,
              name: cnjp(data.name_cn, data.name),
              image: data?.images?.common || '',
              date: data.date,
              eps: data.eps,
              total_episodes: data.total_episodes,
              platform: data.platform,
              rank: data.rating?.rank,
              score: data.rating?.score,
              total: data.rating?.total,
              _loaded: getTimestamp()
            }
          }
        })
      })
    })

    await queue(fetchs, 2)
    this.save()

    return true
  }

  /** 条目信息是懒加载的 (为了首次进入能比较好地使用, 预先加载部分条目数据) */
  fetchSomeSubjects = () => {
    const { data } = this.state
    const subjectIds = []
    data.forEach(item => {
      if (Array.isArray(toJS(item))) {
        subjectIds.push(...item)
      } else {
        subjectIds.push(item)
      }
    })

    subjectIds.length = 200
    this.fetchSubjects(subjectIds)
  }
}
