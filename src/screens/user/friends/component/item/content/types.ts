/*
 * @Author: czy0729
 * @Date: 2026-05-21 01:40:08
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-05-21 01:40:08
 */
export type Props = {
  /** 用户 Id */
  userId: string

  /** 头像地址 */
  avatar: string

  /** 昵称 */
  name: string

  /** 搜索关键字, 空串不高亮 */
  filter: string
}
