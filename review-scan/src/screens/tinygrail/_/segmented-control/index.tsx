/*
 * @Author: czy0729
 * @Date: 2025-04-21 23:01:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-21 23:48:21
 */
import React from 'react'
import { SegmentedControl, SegmentedControlProps } from '@components'
import { _ } from '@stores'
import { DataSource } from '@types'

function TinygrailSegmentedControl<T extends DataSource>(props: SegmentedControlProps<T>) {
  return (
    <SegmentedControl
      type='tinygrailPlain'
      tintColor={_.select(_.colorTinygrailContainer, 'rgba(255, 255, 255, 0.2)')}
      backgroundColor={_.select(_.colorTinygrailBg, _.colorTinygrailBorder)}
      size={11}
      {...props}
    />
  )
}

export default TinygrailSegmentedControl
