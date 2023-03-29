/*
 * @Author: czy0729
 * @Date: 2021-06-09 06:34:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 11:42:58
 */
import React from 'react'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function IconCopy({ $, navigation }: Ctx) {
  return (
    <IconHeader
      name='md-filter-none'
      color={_.colorDesc}
      size={17}
      onPress={() => $.onCopy(navigation)}
    />
  )
}

export default obc(IconCopy)
