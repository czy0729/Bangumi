/*
 * @Author: czy0729
 * @Date: 2019-07-19 00:04:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 00:34:07
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Cover from './cover'
import { COMPONENT } from './ds'

function CoverWrap(props, { $, navigation }: Ctx) {
  return (
    <Cover
      image={$.cover}
      placeholder={$.coverPlaceholder}
      width={$.imageWidth}
      height={$.imageHeight}
      subjectId={$.subjectId}
    />
  )
}

export default obc(CoverWrap, COMPONENT)
