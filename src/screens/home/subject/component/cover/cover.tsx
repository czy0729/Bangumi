/*
 * @Author: czy0729
 * @Date: 2019-07-19 00:04:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-22 17:10:39
 */
import React, { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { Cover as CoverComp, Heatmap, Squircle } from '@components'
import { systemStore } from '@stores'
import { getCoverLarge, postTask } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { IMG_DEFAULT, WEB } from '@constants'
import { EventType } from '@types'
import { COMPONENT_MAIN } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

const MEMO_LOADED = new Map<string, boolean>()

function Cover({ image, placeholder, width, height, subjectId }: Props) {
  r(COMPONENT_MAIN)

  const [isLoaded, setIsLoaded] = useState(false)

  const loaded = useMemo(
    () => (typeof image === 'string' && MEMO_LOADED.get(image)) || isLoaded,
    [image, isLoaded]
  )
  const event = useMemo<EventType>(
    () => ({
      id: '条目.封面图查看',
      data: { subjectId }
    }),
    [subjectId]
  )

  const handleLoad = useCallback(() => {
    if (typeof image === 'string') MEMO_LOADED.set(image, true)

    postTask(() => setIsLoaded(true), (systemStore.setting.imageFadeIn ? 880 : 80) + 800)
  }, [image])

  return useObserver(() => {
    const styles = memoStyles()

    const renderPlaceholder = () => {
      if (!WEB && loaded && image) return null

      return (
        <CoverComp
          style={[
            styles.placeholder,
            {
              opacity: loaded ? 0 : 1
            }
          ]}
          src={placeholder || IMG_DEFAULT}
          size={width}
          height={height}
          noDefault
          radius={false}
          skeleton={false}
        />
      )
    }

    const renderCover = () => {
      if (!image) return null

      return (
        <CoverComp
          src={image}
          size={width}
          height={height}
          noDefault
          radius={false}
          skeleton={false}
          imageViewer
          imageViewerSrc={getCoverLarge(image || placeholder)}
          fadeDuration={0}
          sync
          event={event}
          onLoad={handleLoad}
        />
      )
    }

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
          {WEB && renderPlaceholder()}
          {renderCover()}
          {!WEB && renderPlaceholder()}
          <Heatmap id='条目.封面图查看' />
        </View>
      </Squircle>
    )
  })
}

export default Cover
