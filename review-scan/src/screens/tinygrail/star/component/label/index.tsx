/*
 * @Author: czy0729
 * @Date: 2021-03-12 14:02:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-09 05:26:14
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, LABEL_DS } from './ds'
import { styles } from './styles'

function Label({ $ }: Ctx) {
  return (
    <SegmentedControl
      style={styles.segment}
      type='tinygrailPlain'
      tintColor={_.colorTinygrailContainer}
      backgroundColor={_.select(_.colorTinygrailBg, _.colorTinygrailBorder)}
      size={11}
      values={LABEL_DS}
      selectedIndex={LABEL_DS.findIndex(item => item === $.state.label)}
      onValueChange={$.setLabel}
    />
  )
}

export default ob(Label, COMPONENT)
