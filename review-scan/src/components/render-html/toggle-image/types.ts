/*
 * @Author: czy0729
 * @Date: 2022-09-27 16:45:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-27 16:45:41
 */
import { Props as ImageProps } from '../../image/types'

export type Props = ImageProps & {
  show?: boolean
  onImageFallback?: (arg0?: any) => any
}

export type State = {
  show: boolean
  loaded: boolean | number
  size: string | number
}
