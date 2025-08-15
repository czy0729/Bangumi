/*
 * @Author: czy0729
 * @Date: 2024-07-14 15:52:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-14 15:53:29
 */
import { search } from '@utils/subject/adv'
import Computed from './computed'

export default class Fetch extends Computed {
  /** ADV 本地数据查询 */
  search = () => {
    setTimeout(() => {
      this.setState({
        data: search(this.state.query)
      })
    }, 80)
  }
}
