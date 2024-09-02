/*
 * @Author: czy0729
 * @Date: 2022-03-12 04:56:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 16:52:51
 */
import React from 'react'
import { observer } from 'mobx-react'
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
import { Props } from './types'

function Popover<ItemT extends string[] | readonly string[]>({
  style,
  name = 'md-more-horiz',
  size,
  color,
  data,
  menuStyle,
  onSelect = FROZEN_FN,
  children,
  ...other
}: Props<ItemT>) {
  r(COMPONENT)

  return (
    <PopoverComp
      style={stl(styles.touch, style)}
      placement='bottom'
      {...(IOS
        ? {
            overlay: (
              <Menu
                style={menuStyle}
                data={data || []}
                onSelect={(title: ItemT[number]) => {
                  setTimeout(() => {
                    onSelect(title)
                  }, 0)
                }}
              />
            )
          }
        : {
            data: data || [],
            onSelect
          })}
      {...other}
    >
      {!!name && (
        <Flex style={styles.icon} justify='center'>
          <Iconfont size={size} name={name} color={color || _.colorTitle} />
        </Flex>
      )}
      {children}
    </PopoverComp>
  )
}

export default observer(Popover)
