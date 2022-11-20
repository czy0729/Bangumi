/*
 * @Author: czy0729
 * @Date: 2022-11-20 08:37:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-20 08:43:55
 */
import React from 'react'
import { Cover as CompCover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

function Cover({ subjectId, width, onPress }, { $ }: Ctx) {
  const subject = $.subject(subjectId)
  const imageWidth = _.isMobileLanscape ? 60 : width
  const imageHeight = imageWidth * 1.4
  return (
    <CompCover
      key={subjectId}
      size={imageWidth}
      height={imageHeight}
      src={subject?.images?.medium}
      radius
      shadow
      onPress={onPress}
    />
  )
}

export default obc(Cover)
