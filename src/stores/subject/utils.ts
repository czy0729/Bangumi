/*
 * @Author: czy0729
 * @Date: 2023-04-16 13:26:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-20 01:46:28
 */
import { ResponseV0Episodes, SubjectId } from '@types'
import { SubjectSnapshot } from './types'

export function getInt(subjectId: SubjectId) {
  const str = String(subjectId)
  return Number(str.slice(str.length - 3, str.length))
}

export function getSubjectSnapshot(
  air_date = '',
  common = '',
  name = '',
  name_cn = '',
  score = 0,
  total = 0,
  rank: number | '' = ''
) {
  const subjectSnapShot: SubjectSnapshot = {
    air_date,
    images: {
      common
    },
    name,
    name_cn,
    rating: {
      score,
      total
    },
    rank,
    _loaded: 1
  }
  return subjectSnapShot
}

export function mapV0Episodes(data: ResponseV0Episodes['data'] = []) {
  return data.map(item => ({
    airdate: item.airdate,
    comment: item.comment,
    desc: '',
    duration: item.duration,
    id: item.id,
    name: item.name,
    name_cn: item.name_cn,
    sort: item.sort,
    status: item.name || item.name_cn ? 'Air' : 'NA',
    type: item.type,
    url: `http://bgm.tv/ep/${item.id}`
  }))
}
