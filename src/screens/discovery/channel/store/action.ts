/*
 * @Author: czy0729
 * @Date: 2024-08-20 14:49:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-20 14:50:31
 */
import { SubjectType } from '@types'
import Fetch from './fetch'

export default class Action extends Fetch {
  toggleType = (type: SubjectType) => {
    this.setState({
      type
    })
    this.fetchChannel()
  }
}
