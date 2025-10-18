/*
 * @Author: czy0729
 * @Date: 2019-07-19 00:04:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 19:35:59
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { Cover as CoverComp, Heatmap, Squircle } from '@components'
import { systemStore } from '@stores'
import { getCoverLarge } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { IMG_DEFAULT } from '@constants'
import { COMPONENT_MAIN } from './ds'
import { memoStyles } from './styles'

import type { CoverProps } from '@components'
import type { EventType } from '@types'
import type { Props } from './types'

function Cover({ image, placeholder, width, height, subjectId }: Props) {
  r(COMPONENT_MAIN)

  const event = useMemo<EventType>(
    () => ({
      id: '条目.封面图查看',
      data: { subjectId }
    }),
    [subjectId]
  )

  return useObserver(() => {
    const styles = memoStyles()
    const baseCoverProps: CoverProps = {
      size: width,
      height,
      noDefault: true,
      radius: false,
      skeleton: false
    } as const

    return (
      <Squircle
        style={styles.container}
        width={width}
        height={height}
        radius={systemStore.coverRadius}
      >
        <View
          style={{
            minWidth: width,
            minHeight: height
          }}
        >
          <CoverComp
            {...baseCoverProps}
            style={styles.placeholder}
            src={placeholder || IMG_DEFAULT}
          />
          {typeof image === 'string' && !!image && (
            <CoverComp
              {...baseCoverProps}
              style={styles.cover}
              src={image}
              imageViewer
              imageViewerSrc={getCoverLarge(image || placeholder)}
              fadeDuration={0}
              event={event}
            />
          )}
          <Heatmap id='条目.封面图查看' />
        </View>
      </Squircle>
    )
  })
}

export default Cover
