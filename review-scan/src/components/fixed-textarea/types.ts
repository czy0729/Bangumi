/*
 * @Author: czy0729
 * @Date: 2022-10-19 13:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-29 04:04:44
 */
import { ReactNode } from '@types'

export type Props = {
  /** 输入框值 */
  value?: string

  /** 输入框提示信息 */
  placeholder?: string

  /** 是否开启简易模式 (只包含输入部分功能) */
  simple?: boolean

  /** 是否回复显示来源于 [平台] 宣传语 */
  source?: boolean

  /** 在 TextArea 下方设置常用短语 */
  marks?: string[] | readonly string[]

  extraComponent?: any

  children?: ReactNode

  /** 关闭回调 */
  onClose?: (arg0?: any) => any

  /** 输入框改变回调 */
  onChange?: (value: string) => any

  /** 提交回调 */
  onSubmit?: (value: string) => any
}
