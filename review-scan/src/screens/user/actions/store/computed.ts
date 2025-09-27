/*
 * @Author: czy0729
 * @Date: 2024-09-14 07:43:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 07:47:51
 */
import { computed } from 'mobx'
import { desc } from '@utils'
import State from './state'

export default class Computed extends State {
  @computed get subjectId() {
    return this.params.subjectId
  }

  @computed get data() {
    const { data } = this.state
    return data.data
      .slice()
      .sort((a, b) => desc(Number(a.sort) || 0, Number(b.sort) || 0))
      .sort((a, b) => desc(a.active, b.active))
  }
}
