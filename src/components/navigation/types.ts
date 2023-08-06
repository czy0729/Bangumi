
/*
* @Author: czy0729
* @Date: 2023-07-25 15:09:52
* @Last Modified by: czy0729
* @Last Modified time: 2023-07-25 15:10:43
*/
import { ReactNode } from "@types"

export type Props = {
  children: ReactNode
}

export type NavigationEventsProps = {
  /** 聚焦前，在 react-navigation@5 后，与 onDidFocus 合并，同时只使用一个即可 */
  onWillFocus?: () => any

  /** 聚焦后，在 react-navigation@5 后，与 onWillFocus 合并，同时只使用一个即可 */
  onDidFocus?: () => any

  /** 失去焦点前，在 react-navigation@5 后，与 onDidBlur 合并，同时只使用一个即可 */
  onWillBlur?: () => any

  /** 失去焦点后，在 react-navigation@5 后，与 onWillBlur 合并，同时只使用一个即可 */
  onDidBlur?: () => any
}
