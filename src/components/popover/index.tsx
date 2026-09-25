/*
 * @Author: czy0729
 * @Date: 2022-05-02 11:29:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 05:57:59
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { IOS } from '@constants'
import { HoldItem } from '../hold-menu'
import { Touchable } from '../touchable'
import { usePopoverItems } from './hooks'
import { COMPONENT } from './ds'

import type { PopoverComponent, PopoverData, Props as PopoverProps } from './types'
export type { PopoverProps, PopoverData }

/** 点击位置弹出层 (iOS: react-native-hold-menu) */
function Popover<Data extends PopoverData>({
  data,
  title = '',
  style,
  activateOn,
  onSelect,
  onPress,
  onLongPress,
  children
}: PopoverProps<Data>) {
  r(COMPONENT)

  const { items, activateOn: popoverActivateOn } = usePopoverItems({
    data,
    title,
    onSelect,
    onLongPress,
    activateOn
  })

  return (
    <View style={style}>
      <HoldItem
        key={items.map(item => item.text).join()}
        items={items}
        activateOn={popoverActivateOn}
        closeOnTap
        hapticFeedback={IOS ? 'Light' : 'None'}
      >
        {/** 仅 hold 模式下点击归外部回调, 由 Popover 统一包一层 Touchable; tap / tap-hold 模式下点击用于激活菜单, 包装会抢占手势 */}
        {popoverActivateOn === 'hold' && onPress ? (
          <Touchable withoutFeedback onPress={onPress}>
            {children}
          </Touchable>
        ) : (
          children
        )}
      </HoldItem>
    </View>
  )
}

const PopoverWithObserver = observer(Popover) as PopoverComponent

export { PopoverWithObserver as Popover }

export default PopoverWithObserver
