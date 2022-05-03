/*
 * @Author: czy0729
 * @Date: 2022-03-12 04:56:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-03 10:56:36
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { IOS } from '@constants'
import { ViewStyle, ColorValue, ReactNode } from '@types'
import { Flex } from '../flex'
import { Iconfont } from '../iconfont'
import { Popover as CompPopover } from '../popover'
import { Menu } from '../menu'
import { styles } from './styles'

type Props = {
  /** 图标名字 */
  name: string

  /** 图标颜色 */
  color: ColorValue

  /** Popover data */
  data: string[]

  /** 菜单样式 */
  menuStyle: ViewStyle

  /** Popover onSelect */
  onSelect: (title?: string) => any

  children: ReactNode
}

function Popover({
  name = 'md-more-horiz',
  color,
  data = [],
  menuStyle,
  onSelect = () => {},
  children,
  ...other
}: Props) {
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
