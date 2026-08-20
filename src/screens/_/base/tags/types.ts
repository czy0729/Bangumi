/*
 * @Author: czy0729
 * @Date: 2026-04-24 10:42:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-24 10:43:55
 */
import type { WithViewStyles } from '@types'

/** Tags 组件 Props */
export type Props = WithViewStyles<{
  /** 标签值列表 */
  value?: readonly string[]

  /** 激活状态的标签值列表 */
  active?: readonly string[]

  /** 最多显示数量，超出后显示 +N */
  limit?: number
}>

/** useTagsData 返回值 */
export type UseTagsDataResult = {
  /** 是否触发了截断 */
  hasLimit: boolean

  /** 待渲染数据 */
  data: { id: string }[]

  /** 被截断的数量 */
  extraCount: number
}
