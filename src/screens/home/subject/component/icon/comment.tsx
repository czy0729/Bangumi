/*
 * @Author: czy0729
 * @Date: 2021-01-17 01:13:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:46:37
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconReverse } from '@_'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { styles } from './styles'

import type { Ctx } from '../../types'

function IconComment() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
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
  })
}

export default IconComment
