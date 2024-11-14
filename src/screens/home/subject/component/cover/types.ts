/*
 * @Author: czy0729
 * @Date: 2022-08-25 21:31:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:38:26
 */
import { CoverProps } from '@components'
import { SubjectId } from '@types'

export type Props = {
  image: string
  placeholder: CoverProps['src']
  width: number
  height: number
  subjectId: SubjectId
}
