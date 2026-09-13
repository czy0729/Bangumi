/*
 * @Author: czy0729
 * @Date: 2023-02-14 03:26:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-31 20:22:37
 */
import { _ } from '@stores'

export const styles = _.create({
  icon: {
    width: 36,
    height: 36
  },
  /**
   * 添加输入行
   *  - 与上方列表的距离: 列表容器 paddingBottom (sm) + 本行 paddingTop (sm) = md
   *  - 卡片底部留白: 用 md 与上方一致, 避免输入框贴着卡片底边
   * */
  section: {
    paddingTop: _.sm,
    paddingBottom: _.md,
    paddingRight: _.sm,
    paddingLeft: _._wind
  },
  input: {
    height: 44,
    paddingVertical: 0
  }
})
