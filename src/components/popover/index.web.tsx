/*
 * @Author: czy0729
 * @Date: 2023-05-26 08:51:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 06:18:27
 */
import { useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import Dropdown from 'rc-dropdown'
import 'rc-dropdown/assets/index.css'
import { r } from '@utils/dev'
import { Component } from '../component'
import { Menu } from '../menu'
import { usePopoverDropdown } from './hooks'
import { COMPONENT } from './ds'
import './index.scss'

import type { PopoverComponent, PopoverData, Props as PopoverProps } from './types'
export type { PopoverProps, PopoverData }

/** 点击位置弹出层 (Web: rc-dropdown + Menu) */
function Popover<Data extends PopoverData>({
  data,
  title = '',
  desc = '',
  style,
  onSelect,
  children
}: PopoverProps<Data>) {
  r(COMPONENT)

  const { visible, onVisibleChange, handleSelect } = usePopoverDropdown({ onSelect })

  const overlayElement = useMemo(() => {
    const menuTitle = title ? [title] : []

    return (
      <Menu
        title={menuTitle.length ? menuTitle : undefined}
        data={data}
        desc={desc}
        onSelect={(item, index) => handleSelect(item as Data[number], index)}
      />
    )
  }, [data, title, desc, handleSelect])

  return (
    <Component id='component-popover'>
      <Dropdown
        visible={visible}
        trigger={['click']}
        overlay={overlayElement}
        onVisibleChange={onVisibleChange}
        getPopupContainer={() => window.document.querySelector('component-storybook-page')}
      >
        <View style={style}>{children}</View>
      </Dropdown>
    </Component>
  )
}

const PopoverWithObserver = observer(Popover) as PopoverComponent

export { PopoverWithObserver as Popover }

export default PopoverWithObserver
