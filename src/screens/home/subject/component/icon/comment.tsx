/*
 * @Author: czy0729
 * @Date: 2021-01-17 01:13:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:11:54
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { IconReverse } from '@_'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { COMPONENT_COMMENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function IconComment() {
  const { $ } = useStore<Ctx>(COMPONENT_COMMENT)

  const { _reverse } = $.subjectComments

  return (
    <IconReverse
      style={stl(styles.comment, _reverse && styles.reverse)}
      color={_reverse ? _.colorMain : _.colorIcon}
      onPress={$.toggleReverseComments}
    >
      <Heatmap id='条目.吐槽箱倒序' />
    </IconReverse>
  )
}

export default observer(IconComment)
