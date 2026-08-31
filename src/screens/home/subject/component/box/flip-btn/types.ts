/*
 * @Author: czy0729
 * @Date: 2025-09-20 02:18:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-20 04:42:14
 */
export type Props = {
  onPress: () => void
}

export type FlipBtnProps = {
  animate: boolean
  btnText: string
  rating: number
  privacy: 0 | 1
  last: string
  onAnimated: () => void
  onPress: () => void
}

export type BtnsProps = Pick<FlipBtnProps, 'btnText' | 'rating' | 'privacy' | 'last' | 'onPress'>
