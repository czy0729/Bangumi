/*
 * @Author: czy0729
 * @Date: 2022-08-25 21:31:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:38:26
 */
import type { CoverProps } from '@components'
import type { SubjectId } from '@types'

export type Props = {
  /** 封面地址 (可能为 require 资源, 非字符串时只渲染 placeholder) */
  image: CoverProps['src']
  placeholder: CoverProps['src']
  width: number
  height: number
  subjectId: SubjectId
  nsfw: boolean
}
