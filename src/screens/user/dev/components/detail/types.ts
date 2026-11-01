/*
 * @Author: czy0729
 * @Date: 2026-11-02 05:52:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 05:52:07
 *
 * 用户数据调试块类型
 */
import type { PropsWithChildren } from 'react'

import type { Params } from '../../types'

/** Detail 属性 */
export type Props = Pick<Params, 'userId'>

/** Block 属性 */
export type BlockProps = PropsWithChildren<{
  /** 标题 */
  title?: string

  /** 展示值, 字符串直接输出, 数组逐项 JSON 序列化 */
  value?: string | unknown[]

  /** 是否默认展开 */
  defaultOpen?: boolean
}>
