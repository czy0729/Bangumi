/*
 * @Author: czy0729
 * @Date: 2021-06-09 06:34:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-12 05:55:22
 */
import React from 'react'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

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

export default ob(IconCopy, COMPONENT)
