/*
 * @Author: czy0729
 * @Date: 2021-01-17 01:13:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-29 22:56:57
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconReverse } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

function IconComment(props, { $ }: Ctx) {
  const { _reverse } = $.subjectComments
  return (
    <IconReverse
      style={_reverse ? [styles.touch, styles.reverse] : styles.touch}
      color={_reverse ? _.colorMain : _.colorIcon}
      onPress={$.toggleReverseComments}
    >
      <Heatmap id='条目.吐槽箱倒序' />
    </IconReverse>
  )
}

export default obc(IconComment)

const styles = _.create({
  touch: {
    marginRight: -12
  },
  reverse: {
    transform: [
      {
        rotateX: '180deg'
      }
    ]
  }
})
