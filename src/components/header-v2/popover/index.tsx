/*
 * @Author: czy0729
 * @Date: 2022-03-12 04:56:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 05:56:59
 */
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { FROZEN_FN } from '@constants'
import { Flex } from '../../flex'
import { Iconfont } from '../../iconfont'
import { Popover as PopoverComp } from '../../popover'
import { styles } from './styles'

import type { PopoverData } from '../../popover'
import type { Props } from './types'

function Popover<Data extends PopoverData>({
  style,
  name = 'md-more-horiz',
  size,
  color,
  data,
  onSelect = FROZEN_FN,
  children,
  ...other
}: Props<Data>) {
  return (
    <PopoverComp
      style={stl(styles.touch, style)}
      placement='bottom'
      data={data}
      onSelect={onSelect}
      {...other}
    >
      {name ? (
        <Flex style={styles.icon} justify='center'>
          <Iconfont size={size} name={name} color={color || _.colorTitle} />
        </Flex>
      ) : null}
      {children}
    </PopoverComp>
  )
}

export default observer(Popover)
