/*
 * @Author: czy0729
 * @Date: 2024-07-20 10:40:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-06 06:19:10
 *
 * 找 NSFW 数据请求
 */
import { search } from '@utils/subject/nsfw'
import Computed from './computed'

export default class Fetch extends Computed {
  /** NSFW 本地数据查询 */
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
