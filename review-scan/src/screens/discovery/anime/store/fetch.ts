/*
 * @Author: czy0729
 * @Date: 2024-07-25 06:13:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-25 06:35:32
 */
import { search } from '@utils/subject/anime'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 动画本地数据查询 */
  search = (passQuery?: any) => {
    setTimeout(() => {
      this.setState({
        data: search({
          ...(passQuery || this.state.query),
          first: ''
        })
      })
    }, 80)
  }
}
