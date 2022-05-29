/*
 * @Author: czy0729
 * @Date: 2022-03-12 04:56:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-29 08:50:56
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { IOS } from '@constants'
import { Flex } from '../flex'
import { Iconfont } from '../iconfont'
import { Popover as CompPopover } from '../popover'
import { Menu } from '../menu'
import { styles } from './styles'
import { PopoverProps } from './types'

function Popover({
  name = 'md-more-horiz',
  color,
  data = [],
  menuStyle,
  onSelect = () => {},
  children,
  ...other
}: PopoverProps) {
  const popoverProps = IOS
    ? {
        overlay: (
          <Menu
            style={menuStyle}
            data={data}
            onSelect={(title: string) => setTimeout(() => onSelect(title), 0)}
          />
        )
      }
    : {
        data,
        onSelect
      }

  return (
    <CompPopover style={styles.touch} placement='bottom' {...popoverProps} {...other}>
      {!!name && (
        <Flex style={styles.icon} justify='center'>
          <Iconfont name={name} color={color || _.colorTitle} />
        </Flex>
      )}
      {children}
    </CompPopover>
  )
}

export default observer(Popover)
