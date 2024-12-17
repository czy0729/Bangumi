/*
 * @Author: czy0729
 * @Date: 2024-06-22 05:14:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:38:23
 */
import { desc, fixedSubjectInfo, getTimestamp, info, pick } from '@utils'
import { t } from '@utils/fetch'
import { gets } from '@utils/kv'
import axios from '@utils/thirdParty/axios'
import { MODEL_SUBJECT_TYPE, WEB } from '@constants'
import { SubjectTypeValue } from '@types'
import Computed from './computed'
import { HOST_REC } from './ds'

export default class Fetch extends Computed {
  /** 这个接口太慢了, 而且不太依赖, 暂时屏蔽 */
  fetchSubjects = async () => {
    return true

    // const ids = [...this.ids]
    // if (!ids.length) return true

    // await subjectStore.initSubjectV2(ids)
    // const now = getTimestamp()
    // const fetchs = []
    // ids.forEach(id => {
    //   const { _loaded } = subjectStore.subjectV2(id)
    //   if (!_loaded || now - Number(_loaded) >= 60 * 60) {
    //     fetchs.push(() => {
    //       console.info('fetchSubjects', id)
    //       return subjectStore.fetchSubjectV2(id)
    //     })
    //   }
    // })
    // if (!fetchs.length) return true

    // return queue(fetchs)
  }

  /** 从云端快照加载条目基本数据 */
  fetchSubjectsFromOSS = async () => {
    const ids = [...this.ids]
    if (!ids.length) return true

    const { subjects } = this.state
    const now = getTimestamp()
    const fetchIds = []
    ids.forEach(id => {
      // maybe nsfw
      if (!this.subject(id).id) {
        const { _loaded } = subjects[id] || {}
        if (!_loaded || now - Number(_loaded) >= 60 * 60) {
          const { _loaded } = this.subjectOSS(id)
          if (!_loaded || now - Number(_loaded) >= 60 * 60) {
            fetchIds.push(`subject_${id}`)
          }
        }
      }
    })
    if (!fetchIds.length) return true

    try {
      console.info('fetchSubjectsFromOSS', fetchIds)

      const picker = [
        'name',
        'name_cn',
        'image',
        'rank',
        'rating',
        'totalEps',
        'info',
        'staff',
        'tags'
      ]
      const data = await gets(fetchIds, picker)
      Object.entries(data).forEach(([key, item]) => {
        try {
          data[key] = pick(item, picker)

          if (data[key].info) {
            data[key].date =
              fixedSubjectInfo(data[key].info).match(
                /<li><span>(发售日|放送开始|上映年度|上映时间): <\/span>(.+?)<\/li>/
              )?.[2] || ''
          }
          delete data[key].info

          if (!data[key].date && Array.isArray(data[key].tags)) {
            let find = data[key].tags.find(item => /^\d+年\d+月$/.test(item.name))
            if (find) data[key].date = find.name

            find = data[key].tags.find(item => /^\d{4}$/.test(item.name))
            if (find) data[key].date = find.name
          }
          delete data[key].tags

          if (Array.isArray(data[key].staff)) {
            // 原作
            const origin = data[key].staff.find(item => item.desc === '原作')
            data[key].origin = origin?.name || origin?.nameJP || ''

            // 导演
            let director = data[key].staff.find(item => item.desc === '导演')
            data[key].director = director?.name || director?.nameJP || ''

            if (!data[key].director) {
              director = data[key].staff.find(
                item => item.desc === '作者' || item.desc === '开发' || item.desc === '音乐'
              )
              data[key].director = director?.name || director?.nameJP || ''
            }
          }
          delete data[key].staff

          data[key]._loaded = getTimestamp()
        } catch (error) {}
      })

      this.setState({
        subjects: data
      })
      this.save()
    } catch (error) {}
  }

  /** 查询 AI 推荐结果 */
  doSearchV2 = async () => {
    try {
      const { cat, value } = this.state
      if (!value) return

      this.setState({
        searching: true
      })

      const subjectType = MODEL_SUBJECT_TYPE.getValue<SubjectTypeValue>(cat)

      // @ts-expect-error
      let { data } = await axios({
        method: 'POST',
        url: `${HOST_REC}/api/v4/rec/${value.trim()}`,
        data: {
          IsTagFilter: false,
          IsTimeFilter: false,
          // endDate: '2023-09-26T22:35:09.403Z',
          // startDate: '1899-12-31T15:54:17.000Z',
          popdays: 7,
          strategy: 'p',
          tags: [[]],
          topk: 40,
          type: String(subjectType || 0),
          update_f: false
        }
      })
      if (data?.data) data = data.data

      t('推荐.刷新', {
        value: value.trim(),
        type: subjectType || 0
      })

      if (Array.isArray(data) && data.length) {
        this.setState({
          dataV2: {
            [cat]: data
              .sort((a, b) => desc(a.score, b.score))
              .map(item => {
                return {
                  sid: item.sid,
                  type: item.type,
                  score: item.score.toFixed(1)
                }
              })
          }
        })
        if (!WEB) await this.fetchSubjects()
        await this.fetchSubjectsFromOSS()
        this.save()
      } else if (data?.message) {
        this.setState({
          dataV2: {
            [cat]: []
          }
        })
        this.save()

        info(data.message)
      }
    } catch (ex) {
      info('获取出错，请重试')
    }

    this.setState({
      searching: false
    })
  }
}
