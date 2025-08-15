/*
 * @Author: czy0729
 * @Date: 2025-04-22 04:46:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-02 05:57:15
 */
import { HeaderV2Props } from '@components'

export type Props = {
  title: string
  hm: HeaderV2Props['hm']
  go?: boolean
  headerRight?: HeaderV2Props['headerRight']
}
