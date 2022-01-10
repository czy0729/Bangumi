/*
 * @Author: czy0729
 * @Date: 2021-06-09 06:34:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-09 11:59:57
 */
import React from 'react'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function IconCopy({ $, navigation }) {
  return (
    <IconHeader
      style={_.mr.xxs}
      name='md-filter-none'
      color={_.colorDesc}
      size={17}
      onPress={() => $.onCopy(navigation)}
    />
  )
}

export default obc(IconCopy)
