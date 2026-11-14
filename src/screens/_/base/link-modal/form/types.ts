/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:00:00
 */
import type { Ref } from 'react'
import type { InputInstance } from '@components'

export type Props = {
  /** 输入框实例 */
  inputRef: Ref<InputInstance>

  /** 当前链接 */
  link: string
}
