/*
 * @Author: czy0729
 * @Date: 2022-05-02 11:29:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:13:08
 */
import React from 'react'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import PopoverIOS from './popover'
import { COMPONENT } from './ds'
import { Props as PopoverProps } from './types'

export { PopoverProps }

/** 点击位置弹出层 */
export const Popover = observer(
  ({
    style,
    data,
    placement,
    menuStyle,
    overlay,
    onSelect,
    onLongPress,
    children,
    ...other
  }: PopoverProps<typeof data>) => {
    r(COMPONENT)

    return (
      <PopoverIOS
        style={style}
        data={data}
        placement={placement}
        menuStyle={menuStyle}
        overlay={overlay}
        onSelect={onSelect}
        onLongPress={onLongPress}
        {...other}
      >
        {children}
      </PopoverIOS>
    )
  }
)
