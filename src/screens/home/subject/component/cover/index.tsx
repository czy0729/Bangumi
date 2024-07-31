/*
 * @Author: czy0729
 * @Date: 2019-07-19 00:04:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-31 13:42:06
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Cover from './cover'
import { COMPONENT } from './ds'

function CoverWrap(props, { $, navigation }: Ctx) {
  return (
    <Cover
      image={$.nsfw ? $.subject.images?.common : $.cover}
      placeholder={$.nsfw ? $.subject.images?.common : $.coverPlaceholder}
      width={$.imageWidth}
      height={$.imageHeight}
      subjectId={$.subjectId}
    />
  )
}

export default obc(CoverWrap, COMPONENT)
