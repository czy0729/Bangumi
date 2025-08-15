/*
 * @Author: czy0729
 * @Date: 2024-07-20 10:40:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-20 10:42:51
 */
import { search } from '@utils/subject/nsfw'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 本地数据查询 */
  search = (passQuery?: any) => {
    setTimeout(() => {
      this.setState({
        data: search(passQuery || this.state.query)
      })
    }, 80)
  }
}
