/*
 * @Author: czy0729
 * @Date: 2025-04-11 16:35:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-12 18:46:05
 */
import { SwitchSettingKeys } from '../../types'

export type Props = {
  /** 设置项 */
  setting: SwitchSettingKeys

  /** 设置项过滤 */
  filter: string

  /** 设置项标题 */
  hd: string

  /** 设置项补充说明 */
  information?: string

  /** 设置项外部缩略图说明 */
  thumb?: string[] | readonly string[]

  /** 部分设置项为了让用户直观感受, 本身在代码里面语义是相反的, 设置时需要反转一下 */
  reverse?: boolean
}
