/*
 * @Author: czy0729
 * @Date: 2024-07-25 20:33:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-25 20:34:19
 */
import { search } from '@utils/subject/game'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 游戏本地数据查询 */
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
