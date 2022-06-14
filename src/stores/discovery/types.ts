/*
 * @Author: czy0729
 * @Date: 2022-06-14 14:21:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-14 14:24:00
 */
import { Fn, Id, SubjectId } from '@types'

export type DoCatalogAddRelate = (
  args: {
    catalogId?: Id
    subjectId?: SubjectId
    formhash: string
    noConsole?: boolean
  },
  success?: Fn
) => void
