/*
 * @Author: czy0729
 * @Date: 2023-05-26 08:53:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-05 17:00:42
 */
import React, { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import Dropdown from 'rc-dropdown'
import 'rc-dropdown/assets/index.css'
import { Component } from '../../component'
import { Menu } from '../../menu'
import './index.scss'

function Popover({ children, ...other }) {
  const { style, overlay } = other
  const data = other?.data || overlay?.props?.data
  const title = other?.title || overlay?.props?.title || ''
  const date = other?.date || overlay?.props?.date || ''
  const onSelect = other?.onSelect || overlay?.props?.onSelect

  const [visible, setVisible] = useState(false)
  const onVisibleChange = useCallback(value => {
    setVisible(value)
  }, [])

  const overlayElement = useMemo(() => {
    const menuTitle = title ? [title] : []
    return (
      <Menu
        title={menuTitle.length ? menuTitle : undefined}
        data={data}
        desc={date}
        onSelect={(title, index) => {
          if (typeof onSelect === 'function') {
            setTimeout(() => onSelect(title, index), 0)
          }
          setVisible(false)
        }}
      />
    )
  }, [data, title, date, onSelect])

  return (
    <Component id='component-popover'>
      <Dropdown
        visible={visible}
        trigger={['click']}
        overlay={overlayElement}
        onVisibleChange={onVisibleChange}
        getPopupContainer={() => document.querySelector('component-storybook-page')}
      >
        <View style={style}>{children}</View>
      </Dropdown>
    </Component>
  )
}

export default Popover
