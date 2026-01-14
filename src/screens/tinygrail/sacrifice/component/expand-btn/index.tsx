/*
 * @Author: czy0729
 * @Date: 2024-03-07 17:33:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-13 20:56:12
 */
import React from 'react'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { styles } from './styles'

import type { Props } from './types'

function ExpandBtn({ show, onPress }: Props) {
  return useObserver(() => (
    <IconTouchable
      style={stl(styles.expand, !show && styles.expandClose)}
      name={show ? 'md-keyboard-arrow-up' : 'md-keyboard-arrow-down'}
      color={_.colorTinygrailText}
      onPress={onPress}
    />
  ))
}

export default ExpandBtn
