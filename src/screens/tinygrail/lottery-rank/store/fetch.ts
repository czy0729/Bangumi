/*
 * @Author: czy0729
 * @Date: 2025-07-17 13:11:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-18 00:23:19
 */
import { collectList, get, gets } from '@utils/kv'
import { Detail } from '../types'
import Computed from './computed'

export default class Fetch extends Computed {
  refresh = async () => {
    await this.getUserStatus()
    return this.getList()
  }

  getUserStatus = async () => {
    try {
      const data = await get('tinygrail_lottery_user_status')
      if (data) {
        this.setState({
          userStatus: data
        })
        this.save()
      }

      return true
    } catch (error) {
      return false
    }
  }

  getList = async () => {
    try {
      const { data } = await collectList(this.userId)
      const ids = data.map(item => item.id)
      if (!ids.length) return false

      let detail: Record<string, Detail> = {}
      const detailIds = ids.filter(item => !(item in this.state.detail))
      if (detailIds.length) detail = await gets(detailIds)

      this.setState({
        list: {
          [this.userId]: ids
        },
        detail
      })
      this.save()

      return true
    } catch (error) {
      return false
    }
  }
}
