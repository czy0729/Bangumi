/*
 * @Author: czy0729
 * @Date: 2024-02-12 01:45:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-12 01:45:51
 */
import { Navigation } from '@types'

export type Props = {
  navigation: Navigation
  route?: {
    params?: {
      uri?: string
    }
  }
}
