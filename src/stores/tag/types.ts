/*
 * @Author: czy0729
 * @Date: 2022-06-04 11:11:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-04 11:22:44
 */
import { BrowserSort, SubjectType } from '@constants/model/types'

export type FetchBrowser = (
  args: {
    type?: SubjectType
    airtime?: string | number
    sort?: BrowserSort
  },
  refresh?: boolean
) => Promise<any>
