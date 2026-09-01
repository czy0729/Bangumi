/*
 * @Author: czy0729
 * @Date: 2026-07-02 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 21:00:33
 */
export type Props = {
  /** 是否选中 */
  select: boolean

  /** 是否禁用 */
  disabled: boolean

  /** 切换选中回调 */
  onPress: (select: boolean) => void
}
