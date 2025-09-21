/*
 * @Author: czy0729
 * @Date: 2019-07-19 00:04:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-21 19:49:46
 */
import React, { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { Cover as CoverComp, CoverProps, Heatmap, Squircle } from '@components'
import { systemStore } from '@stores'
import { getCoverLarge, postTask } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { IMG_DEFAULT } from '@constants'
import { EventType } from '@types'
import { COMPONENT_MAIN } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

const MEMO_LOADED = new Map<string, boolean>()

function Cover({ image, placeholder, width, height, subjectId }: Props) {
  r(COMPONENT_MAIN)

  const [showPlaceholder, setShowPlaceholder] = useState(true)

  const event = useMemo<EventType>(
    () => ({
      id: '条目.封面图查看',
      data: { subjectId }
    }),
    [subjectId]
  )

  const handleLoad = useCallback(() => {
    if (typeof image === 'string') MEMO_LOADED.set(image, true)

    const delay = (systemStore.setting.imageFadeIn ? 400 : 100) + 800
    postTask(() => {
      setShowPlaceholder(false)
    }, delay)
  }, [image])

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
          {showPlaceholder && (
            <CoverComp
              {...baseCoverProps}
              style={styles.placeholder}
              src={placeholder || IMG_DEFAULT}
            />
          )}
          {image && (
            <CoverComp
              {...baseCoverProps}
              src={image}
              imageViewer
              imageViewerSrc={getCoverLarge(image || placeholder)}
              fadeDuration={0}
              event={event}
              onLoad={handleLoad}
            />
          )}
          <Heatmap id='条目.封面图查看' />
        </View>
      </Squircle>
    )
  })
}

export default Cover
