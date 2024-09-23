/*
 * @Author: czy0729
 * @Date: 2024-07-26 05:09:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-23 05:42:55
 */
import { search } from '@utils/subject/manga'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 漫画本地数据查询 */
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
