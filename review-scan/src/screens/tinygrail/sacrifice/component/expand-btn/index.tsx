/*
 * @Author: czy0729
 * @Date: 2024-03-07 17:33:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-07 17:35:32
 */
import React from 'react'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { Fn } from '@types'
import { styles } from './styles'

function ExpandBtn({ show, onPress }: { show: boolean; onPress: Fn }) {
  return (
    <IconTouchable
      style={stl(styles.expand, !show && styles.expandClose)}
      name={show ? 'md-keyboard-arrow-up' : 'md-keyboard-arrow-down'}
      color={_.colorTinygrailText}
      onPress={onPress}
    />
  )
}

export default ob(ExpandBtn)
