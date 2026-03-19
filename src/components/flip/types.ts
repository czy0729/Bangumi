/*
 * @Author: czy0729
 * @Date: 2023-03-28 05:05:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 05:39:05
 */
export type Props = {
  height: number
  onAnimated?: () => void
  children: JSX.Element
} & {
  [key: string]: any
}
