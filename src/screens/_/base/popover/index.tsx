/*
 * @Author: czy0729
 * @Date: 2019-06-01 18:25:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:17:20
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Menu, Popover as PopoverComp } from '@components'
import { r } from '@utils/dev'
import { FROZEN_FN, IOS } from '@constants'
import PopoverOld from './old'
import { COMPONENT } from './ds'

import type { PopoverProps } from '@components'

function PopoverWithMenu<ItemT extends string[] | readonly string[]>({
  data,
  menuStyle,
  onSelect = FROZEN_FN,
  children,
  ...other
}: PopoverProps<ItemT>) {
  r(COMPONENT)

  const safeData = (data || []) as ItemT
  const passProps = IOS
    ? {
        ...other,
        overlay: (
          <Menu
            style={menuStyle}
            data={safeData}
            onSelect={(title, index, evt) => {
              setTimeout(() => {
                onSelect(title, index, evt)
              }, 0)
            }}
          />
        )
      }
    : {
        ...other,
        data: safeData,
        onSelect
      }

  return (
    <Component id='base-popover'>
      <PopoverComp key={String((data || []).length)} placement='bottom' {...passProps}>
        {children}
      </PopoverComp>
    </Component>
  )
}

const Popover = observer(PopoverWithMenu) as typeof PopoverWithMenu & {
  Old: typeof PopoverOld
}

Popover.Old = PopoverOld

export { Popover }
export default Popover
