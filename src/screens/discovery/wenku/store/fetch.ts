/*
 * @Author: czy0729
 * @Date: 2026-10-04 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-04 00:00:00
 *
 * 找文库数据请求
 */
import { search } from '@utils/subject/wenku'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 文库本地数据查询 */
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
