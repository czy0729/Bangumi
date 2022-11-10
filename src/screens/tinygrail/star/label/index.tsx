/*
 * @Author: czy0729
 * @Date: 2021-03-12 14:02:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-09 06:50:49
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

const LABEL_DS = ['全局', '持仓'] as const

function Label({ $ }: Ctx) {
  const { label } = $.state
  return (
    <SegmentedControl
      style={styles.segment}
      type='tinygrailPlain'
      tintColor={_.colorTinygrailContainer}
      backgroundColor={_.tSelect(_.colorTinygrailBorder, _.colorTinygrailBg)}
      size={11}
      values={LABEL_DS}
      selectedIndex={LABEL_DS.findIndex(item => item === label)}
      onValueChange={$.setLabel}
    />
  )
}

export default obc(Label)
