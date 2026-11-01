/*
 * @Author: czy0729
 * @Date: 2025-03-20 11:34:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 16:30:50
 *
 * 目录表单属性
 */
import type {
  HandleChange,
  HandleCreate,
  HandleSubmitCatalog,
  State as ComponentState
} from '../types'

export type Props = {
  /** 标题文案 (新建 / 编辑) */
  titleText?: string

  /** 是否显示标题 (独立弹窗由 Modal 承担标题时关闭) */
  showTitle?: boolean

  /** 是否显示表单内的关闭图标 (独立弹窗由 Modal 承担关闭时关闭) */
  showCancel?: boolean

  title: ComponentState['title']
  desc: ComponentState['desc']

  /** 隐私设置, 不传不显示选择行 */
  privacy?: ComponentState['privacy']
  onChange: HandleChange
  onCreate: HandleCreate
  onSubmitCatalog: HandleSubmitCatalog
}
