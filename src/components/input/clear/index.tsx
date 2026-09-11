/*
 * @Author: czy0729
 * @Date: 2023-03-11 11:20:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-28 10:24:36
 */
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { IOS } from '@constants'
import { flexStyle } from '../../flex'
import { Iconfont } from '../../iconfont'
import { Touchable } from '../../touchable'
import { styles } from './styles'

import type { Props } from './types'

function Clear({ colorClear: color, onPress }: Props) {
  if (IOS) return null

  return (
    <Touchable
      style={stl(flexStyle({ justify: 'center' }), styles.close, styles.icon)}
      onPress={onPress}
    >
      <Iconfont name='md-close' size={16} color={color} />
    </Touchable>
  )
}

export default observer(Clear)
