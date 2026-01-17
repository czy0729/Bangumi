/*
 * @Author: czy0729
 * @Date: 2021-01-21 11:36:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 05:22:08
 */
import React from 'react'
import { Cover as CoverComp, getCoverSrc, Link } from '@components'
import { InView } from '@_'
import { systemStore } from '@stores'
import { x18 } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { HEADER_HEIGHT } from '@styles'
import Heatmaps from './heatmaps'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function Cover({ index, subjectId, typeCn, name, name_cn, image, disabled }: Props) {
  r(COMPONENT)

  return useObserver(() => {
    const { homeListCompact } = systemStore.setting
    const style = homeListCompact ? styles.inViewCompact : styles.inView
    const width = style.minWidth
    const height = style.minHeight

    return (
      <Link
        path='Subject'
        getParams={() => ({
          subjectId,
          _jp: name,
          _cn: name_cn,
          _image: getCoverSrc(image, width),
          _type: typeCn
        })}
        eventId='首页.跳转'
        eventData={{
          to: 'Subject',
          from: 'list'
        }}
        disabled={disabled}
      >
        <InView style={style} y={height * index + HEADER_HEIGHT}>
          <CoverComp
            src={image}
            size={width}
            height={height}
            type={typeCn}
            radius
            cdn={!x18(subjectId)}
            priority={index < 4 ? 'high' : 'normal'}
          />
        </InView>
        {index === 0 && <Heatmaps />}
      </Link>
    )
  })
}

export default Cover
