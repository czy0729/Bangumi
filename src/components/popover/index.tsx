/*
 * @Author: czy0729
 * @Date: 2022-05-02 11:29:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-28 07:39:43
 */
import React from 'react'
import { observer } from 'mobx-react'
import PopoverIOS from './popover-ios'
import { Props } from './types'

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
  }: Props) => {
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
