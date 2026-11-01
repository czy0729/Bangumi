/*
 * @Author: czy0729
 * @Date: 2026-11-01 16:10:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 16:30:50
 *
 * 目录表单弹窗属性
 */
import type { Id } from '@types'

export type Props = {
  /** 是否显示 */
  visible?: boolean

  /** 目录 ID, 传了为编辑, 不传为新建 */
  catalogId?: Id

  /** 初始标题 (编辑时传入当前值) */
  defaultTitle?: string

  /** 初始介绍 (编辑时传入当前值) */
  defaultDesc?: string

  /** 初始隐私设置 ('0' 公开 / '1' 私密, 默认私密) */
  defaultPrivacy?: string

  /** 关闭回调 */
  onClose?: () => void

  /** 提交成功回调 */
  onSuccess?: () => void
}
