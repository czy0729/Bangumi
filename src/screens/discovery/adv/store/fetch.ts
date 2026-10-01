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
      /** collected 为页面本地维度, 剔除后再查询, 避免污染查询指纹 */
      const { collected, ...query } = this.state.query
      this.setState({
        data: search(query)
      })
    }, 80)
  }
}
