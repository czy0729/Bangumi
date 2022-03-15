/*
 * @Author: czy0729
 * @Date: 2020-09-08 12:09:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 02:16:37
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'

function Check({ $ }) {
  return (
    <IconHeader style={_.mr.xs} name='md-check' onPress={$.onSave}>
      <Heatmap id='个人设置.保存' />
    </IconHeader>
  )
}

export default Check
