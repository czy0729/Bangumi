/*
 * @Author: czy0729
 * @Date: 2022-01-30 22:14:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-26 07:41:47
 */
import axios from '@utils/thirdParty/axios'
import { getTimestamp, urlStringify } from '@utils'
import { safe } from '@utils/fetch'
import { APP_ID, UA } from '@constants'
import { getUserStoreAsync } from './async'

export async function request(url) {
  axios.defaults.withCredentials = false

  try {
    const { accessToken } = getUserStoreAsync()

    // 随机数防止接口CDN缓存
    url += `${url.includes('?') ? '&' : '?'}${urlStringify({
      app_id: APP_ID,
      state: getTimestamp()
    })}`

    const { data } = await axios({
      method: 'get',
      url,
      headers: {
        Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        'User-Agent': UA
      }
    })
    return safe(data)
  } catch (ex) {
    return {}
  }
}

export async function fetchSubjectV0(config) {
  const subjectId = Number(config.url.split('/subject/')[1])
  const subject = await request(`https://api.bgm.tv/v0/subjects/${subjectId}`)
  const eps = await request(`https://api.bgm.tv/v0/episodes?subject_id=${subjectId}`)

  const data = {
    id: subjectId,
    url: `https://bgm.tv/subject/${subjectId}`,
    type: subject.type,
    name: subject.name,
    name_cn: subject.name_cn,
    summary: subject.summary,
    eps: eps?.data || [],
    eps_count: subject.eps,
    air_date: subject.date,
    // air_weekday: 2,
    rating: subject.rating,
    rank: subject.rating.rank,
    images: subject.images,
    collection: subject.collection,
    crt: [],
    staff: [],
    blog: [],
    topic: []
  }

  try {
    const crt = await request(`https://api.bgm.tv/v0/subjects/${subjectId}/characters`)
    const staff = await request(`https://api.bgm.tv/v0/subjects/${subjectId}/persons`)
    data.crt = (crt || []).map(item => ({
      ...item,
      id: item.id,
      images: item.images,
      name: item.name,
      name_cn: item.name_cn,
      role_name: item.relation
    }))
    data.staff = (staff || []).map(item => ({
      ...item,
      id: item.id,
      images: item.images,
      name: item.name,
      name_cn: item.name_cn,
      role_name: item.relation
    }))

    return data
  } catch (error) {
    return data
  }
}
