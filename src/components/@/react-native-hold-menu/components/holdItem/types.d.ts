/*
 * @Author: czy0729
 * @Date: 2025-09-12 18:50:16
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-09-12 18:50:16
 */
import { ViewStyle } from 'react-native'
import { TransformOriginAnchorPosition } from '../../utils/calculations'
import { MenuItemProps } from '../menu/types'

export type HoldItemProps = {
  /**
   * List of context menu items.
   * @type MenuItemProps[]
   * @default []
   */
  items: MenuItemProps[]

  /**
   * Object of keys that same name with items to match parameters to onPress actions.
   * @type { [name: string]: (string | number)[] }
   * @examples
   * ```js
   * const items = [
   *  {text: 'Reply', onPress: (messageId) => {}},
   *  {text: 'Copy', onPress: (messageText) => {}},
   * ]
   * ...
   * <HoldItem
   *    items={items}
   *    actionParams={{
   *      Reply: ['dd443224-7f43'],
   *      Copy: ['Hello World!']
   *    }}
   * ><View/></HoldItem>
   * ```
   */
  actionParams?: {
    [name: string]: any[]
  }

  children: React.ReactElement | React.ReactElement[]

  /**
   * Menu anchor position is calculated automaticly.
   * But you can override the calculation by passing an anchor position.
   * @type TransformOriginAnchorPosition
   * @examples
   * menuAnchorPosition="top-bottom"
   */
  menuAnchorPosition?: TransformOriginAnchorPosition

  /**
   * Disables moving holded item
   * @type boolean
   * @default false
   * @examples
   * disableMove={true}
   */
  disableMove?: boolean

  /**
   * HoldItem wrapper component styles.
   * You may need for some examples like dynamic width or hight like message boxes.
   * See Whatsapp example.
   * @type ViewStyles
   * @default {}
   * @examples
   * containerStyles={{ maxWidth: '80%' }}
   */
  containerStyles?: ViewStyle | ViewStyle[]

  /**
   * Theme for menu background and texts
   * @type string
   * @examples
   * theme="light"
   */
  theme?: 'light' | 'dark'

  /**
   * Set true if you want to open menu from bottom
   * @type boolean
   * @default false
   * @examples
   * bottom={true}
   */
  bottom?: boolean

  /**
   * Set if you'd like a different tap activation
   * @type string
   * @default 'hold'
   * @examples
   * activateOn="hold"
   */
  activateOn?: 'tap' | 'double-tap' | 'hold'

  /**
   * Set if you'd like to enable haptic feedback on activation
   * @type string
   * @default 'Medium'
   * @examples
   * hapticFeedback="None"
   */
  hapticFeedback?:
    | 'None'
    | 'Selection'
    | 'Light'
    | 'Medium'
    | 'Heavy'
    | 'Success'
    | 'Warning'
    | 'Error'

  /**
   * Set true if you want to close menu when tap to HoldItem
   * @type boolean
   * @default false
   * @examples
   * closeOnTap={true}
   */
  closeOnTap?: boolean
}

export type GestureHandlerProps = {
  children: React.ReactElement | React.ReactElement[]
}
