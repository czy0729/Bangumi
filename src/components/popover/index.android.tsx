/*
 * @Author: czy0729
 * @Date: 2019-12-14 16:28:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 06:17:55
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { Touchable } from '../touchable'
import { usePopoverPress } from './hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { PopoverComponent, PopoverData, Props as PopoverProps } from './types'
export type { PopoverProps, PopoverData }

/** 点击位置弹出层 (Android: 系统原生弹窗菜单) */
function Popover<Data extends PopoverData>({
  data,
  style,
  hitSlop,
  activateOn = 'tap',
  onSelect,
  onLongPress,
  children
}: PopoverProps<Data>) {
  r(COMPONENT)

  const {
    anchorRef,
    delayPressIn,
    onPress,
    onLongPress: handleLongPress
  } = usePopoverPress({
    data,
    onSelect,
    onLongPress,
    activateOn
  })

  return (
    <View>
      <View ref={anchorRef} style={styles.anchor} pointerEvents='none' />
      <Touchable
        style={style}
        hitSlop={hitSlop}
        delayPressIn={delayPressIn}
        onPress={onPress}
        onLongPress={handleLongPress}
      >
        {children}
      </Touchable>
    </View>
  )
}

const PopoverWithObserver = observer(Popover) as PopoverComponent

export { PopoverWithObserver as Popover }

export default PopoverWithObserver
