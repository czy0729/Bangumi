/*
 * @Author: czy0729
 * @Date: 2024-03-05 04:16:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-18 22:02:51
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { Flex, Image, Text } from '@components'
import { _ } from '@stores'
import { showImageViewer, stl, tinygrailOSS } from '@utils'
import { useObserver } from '@utils/hooks'
import { ColorValue } from '@types'
import { memoStyles } from './styles'

function Cover({ level, cover, coverSize = 150, name, refine, event, onPress }) {
  const src = tinygrailOSS(cover, coverSize as 150 | 480)
  const imageViewerSrc = tinygrailOSS(cover, 480)
  const imageEvent = useMemo(
    () => ({
      id: event?.id,
      data: {
        name,
        ...event.data
      }
    }),
    [event.data, event?.id, name]
  )
  const handleLongPress = useCallback(() => {
    showImageViewer([
      {
        url: imageViewerSrc
      }
    ])
  }, [imageViewerSrc])

  return useObserver(() => {
    const styles = memoStyles()
    let colorLevel: ColorValue
    if (level === 3) {
      colorLevel = '#b169ff'
    } else if (level === 2) {
      colorLevel = '#ffc107'
    } else if (level === 1) {
      colorLevel = '#c0c0c0'
    }

    const isFromBgm = src.includes('lain.bgm.tv')
    return (
      <View
        style={[
          styles.wrap,
          {
            borderColor: colorLevel,
            borderWidth: colorLevel ? _.select(1.5, 2) : 0
          }
        ]}
      >
        <Image
          key={src}
          style={stl(styles.image, isFromBgm && styles.imageResize)}
          size={isFromBgm ? styles.imageResize.width : styles.image.width}
          height={isFromBgm ? styles.imageResize.height : styles.image.height}
          src={src}
          imageViewer={!onPress}
          imageViewerSrc={imageViewerSrc}
          resizeMode={isFromBgm ? 'contain' : 'cover'}
          skeletonType='tinygrail'
          event={imageEvent}
          onPress={onPress}
          onLongPress={onPress ? handleLongPress : undefined}
        />
        {!!refine && (
          <Flex
            style={[
              styles.refine,
              {
                backgroundColor: colorLevel || _.colorBg
              }
            ]}
            justify='center'
          >
            <Text type='__plain__' size={12} bold shadow>
              +{refine}
            </Text>
          </Flex>
        )}
      </View>
    )
  })
}

export default Cover
