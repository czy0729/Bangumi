/*
 * @Author: czy0729
 * @Date: 2021-03-12 14:02:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 22:40:44
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT, LABEL_DS } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

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
