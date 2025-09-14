/*
 * @Author: czy0729
 * @Date: 2025-03-05 04:45:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-08 21:13:31
 */
import { getTimestamp } from '@utils'
import { collectList, gets } from '@utils/kv'
import Computed from './computed'

export default class Fetch extends Computed {
  getList = async () => {
    const { data } = await collectList('tinygrail')
    if (Array.isArray(data) && data?.length) {
      this.setState({
        data: {
          list: data.reverse(),
          _loaded: getTimestamp()
        }
      })
    } else {
      this.setState({
        data: {
          list: [],
          _loaded: getTimestamp()
        }
      })
    }

    this.save()

    return true
  }

  getDetails = async (ids: string[]) => {
    const detail = await gets(ids)
    Object.entries(detail).forEach(([key, value]) => {
      if (!value) delete detail[key]
    })
    if (!Object.keys(detail).length) return false

    this.setState({
      detail
    })
    this.save()

    return true
  }

  getLikes = async (ids: string[]) => {
    const likes = await gets(ids.map(item => `likes_${item}`))
    Object.entries(likes).forEach(([key, value]) => {
      if (!value) delete likes[key]
    })
    if (!Object.keys(likes).length) return false

    this.setState({
      likes
    })
    this.save()

    return true
  }
}
