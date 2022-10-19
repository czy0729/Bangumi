/*
 * @Author: czy0729
 * @Date: 2022-10-19 13:52:24
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-19 13:52:24
 */
export type Props = {
  value?: string
  placeholder?: string
  simple?: boolean
  source?: boolean
  onClose?: (arg0?: any) => any
  onChange?: (value: string) => any
  onSubmit?: (value: string) => any
}
