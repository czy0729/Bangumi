/*
 * @Author: czy0729
 * @Date: 2022-03-12 04:56:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 16:14:02
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { IOS } from '@constants'
import { Flex } from '../../flex'
import { Iconfont } from '../../iconfont'
import { Menu } from '../../menu'
import { Popover as CompPopover } from '../../popover'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props } from './types'

function Popover({
  style,
  name = 'md-more-horiz',
  size,
  color,
  data = [],
  menuStyle,
  onSelect = () => {},
  children,
  ...other
}: Props) {
  r(COMPONENT)

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
    <CompPopover style={stl(styles.touch, style)} placement='bottom' {...popoverProps} {...other}>
      {!!name && (
        <Flex style={styles.icon} justify='center'>
          <Iconfont size={size} name={name} color={color || _.colorTitle} />
        </Flex>
      )}
      {children}
    </CompPopover>
  )
}

export default observer(Popover)