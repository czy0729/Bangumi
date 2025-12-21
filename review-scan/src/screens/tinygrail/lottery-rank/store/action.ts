/*
 * @Author: czy0729
 * @Date: 2025-07-17 13:11:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-17 18:28:44
 */
import { feedback } from '@utils'
import { update } from '@utils/kv'
import { getDay } from '../utils'
import Fetch from './fetch'

export default class Action extends Fetch {
  updateUserStatus = async () => {
    const { username } = this.userInfo
    if (!username) return false

    await this.getUserStatus()

    const userStatus = {
      ...this.state.userStatus,
      [username]: !this.userStatus(username)
    }
    await update('tinygrail_lottery_user_status', userStatus)

    this.setState({
      userStatus
    })
    this.save()
    feedback()
  }

  onSubtractDay = (step: 1 | -1) => {
    const prev = Math.min(7, Math.max(this.state.prev + step, 0))
    if (Number(getDay(prev)) < 250718) return false

    this.setState({
      prev: Math.min(7, Math.max(this.state.prev + step, 0))
    })
    this.getList()
    feedback(true)
  }

  onSort = (label: string) => {
    this.setState({
      sort: label === '₵' ? 'amount' : ''
    })
    this.save()
  }
}
