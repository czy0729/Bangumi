/*
 * @Author: czy0729
 * @Date: 2021-06-09 06:34:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 15:53:49
 */
import React from 'react'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function IconCopy({ $, navigation }: Ctx) {
  return (
    <IconHeader
      style={_.mr.xs}
      name='md-filter-none'
      color={_.colorDesc}
      size={17}
      onPress={() => $.onCopy(navigation)}
    />
  )
}

export default obc(IconCopy)
