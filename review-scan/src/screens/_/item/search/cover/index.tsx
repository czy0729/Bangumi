/*
 * @Author: czy0729
 * @Date: 2025-01-25 22:41:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-25 22:42:27
 */
import React from 'react'
import { Cover as CoverComp } from '@components'
import { x18 } from '@utils'
import { ob } from '@utils/decorators'
import { InView } from '../../../base'

function Cover({ index, width, height, cover, subjectId, typeCn, isMono }) {
  return (
    <InView
      style={{
        minWidth: width,
        minHeight: height
      }}
      y={height * (index + 1)}
    >
      <CoverComp
        src={cover}
        placeholder={!isMono}
        width={width}
        height={height}
        type={typeCn}
        cdn={!x18(subjectId)}
        priority={index < 4 ? 'high' : 'normal'}
        radius
      />
    </InView>
  )
}

export default ob(Cover)
