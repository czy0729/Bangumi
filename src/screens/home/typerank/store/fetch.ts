/*
 * @Author: czy0729
 * @Date: 2024-08-18 04:08:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 20:27:50
 */
import { collectionStore } from '@stores'
import { fixedSubjectInfo, getTimestamp, pick } from '@utils'
import { gets } from '@utils/kv'
import { SubjectId } from '@types'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 这个接口太慢了, 而且不太依赖, 暂时屏蔽 */
  fetchSubjects = () => {
    return true
  }

  fetchSubjectsFromOSS = async (ids: SubjectId[]) => {
    if (!ids.length) return true

    const { subjects } = this.state
    const now = getTimestamp()
    const fetchIds = []
    ids.forEach(id => {
      // maybe nsfw
      if (!this.subject(id).id) {
        const { _loaded } = subjects[id] || {}
        if (!_loaded || now - Number(_loaded) >= 60 * 60 * 24) {
          const { _loaded } = this.subjectOSS(id)
          if (!_loaded || now - Number(_loaded) >= 60 * 60 * 24) {
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
            let find = data[key].tags.find((item: any) => /^\d+年\d+月$/.test(item.name))
            if (find) data[key].date = find.name

            find = data[key].tags.find((item: any) => /^\d{4}$/.test(item.name))
            if (find) data[key].date = find.name
          }
          delete data[key].tags

          if (Array.isArray(data[key].staff)) {
            // 原作
            const origin = data[key].staff.find((item: any) => item.desc === '原作')
            data[key].origin = origin?.name || origin?.nameJP || ''

            // 导演
            let director = data[key].staff.find((item: any) => item.desc === '导演')
            data[key].director = director?.name || director?.nameJP || ''

            if (!data[key].director) {
              director = data[key].staff.find(
                (item: any) => item.desc === '作者' || item.desc === '开发' || item.desc === '音乐'
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

    collectionStore.fetchCollectionStatusQueue(ids)
  }
}
