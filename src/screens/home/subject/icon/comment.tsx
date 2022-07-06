/*
 * @Author: czy0729
 * @Date: 2021-01-17 01:13:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-06 03:05:01
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconReverse } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function IconComment(props, { $ }: Ctx) {
  const { _reverse } = $.subjectComments
  return (
    <IconReverse
      style={[styles.touch, _reverse && styles.reverse]}
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
    marginRight: -_.sm
  },
  reverse: {
    transform: [
      {
        rotateX: '180deg'
      }
    ]
  }
})
