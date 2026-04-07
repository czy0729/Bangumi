/*
 * @Author: czy0729
 * @Date: 2024-03-07 17:33:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-13 20:56:12
 */
import React from 'react'
import { observer } from 'mobx-react'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { styles } from './styles'

import type { Props } from './types'

function ExpandBtn({ show, onPress }: Props) {
  return (
    <IconTouchable
      style={stl(styles.expand, !show && styles.expandClose)}
      name={show ? 'md-keyboard-arrow-up' : 'md-keyboard-arrow-down'}
      color={_.colorTinygrailText}
      onPress={onPress}
    />
  )
}

export default observer(ExpandBtn)
