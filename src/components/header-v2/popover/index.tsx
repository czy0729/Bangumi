/*
 * @Author: czy0729
 * @Date: 2022-03-12 04:56:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-25 21:27:30
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { FROZEN_FN, IOS } from '@constants'
import { Flex } from '../../flex'
import { Iconfont } from '../../iconfont'
import { Menu } from '../../menu'
import { Popover as PopoverComp } from '../../popover'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { PopoverData } from '../../popover'
import type { Props } from './types'

function Popover<Data extends PopoverData>({
  style,
  name = 'md-more-horiz',
  size,
  color,
  data,
  menuStyle,
  onSelect = FROZEN_FN,
  children,
  ...other
}: Props<Data>) {
  r(COMPONENT)

  return useObserver(() => {
    const commonProps = {
      style: stl(styles.touch, style),
      placement: 'bottom',
      ...other
    } as const

    const overlayProps = IOS
      ? ({
          overlay: (
            <Menu
              style={menuStyle}
              data={data}
              onSelect={(title: Data[number]) => {
                setTimeout(() => onSelect(title), 0)
              }}
            />
          )
        } as const)
      : ({
          data,
          onSelect
        } as const)

    return (
      <PopoverComp {...commonProps} {...overlayProps}>
        {name ? (
          <Flex style={styles.icon} justify='center'>
            <Iconfont size={size} name={name} color={color || _.colorTitle} />
          </Flex>
        ) : null}
        {children}
      </PopoverComp>
    )
  })
}

export default Popover
