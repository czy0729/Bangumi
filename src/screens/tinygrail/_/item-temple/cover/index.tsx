/*
 * @Author: czy0729
 * @Date: 2024-03-05 04:16:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 08:09:02
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, Text } from '@components'
import { _ } from '@stores'
import { tinygrailOSS } from '@utils'
import { ob } from '@utils/decorators'
import { ColorValue } from '@types'
import { memoStyles } from './styles'

function Cover({ level, cover, coverSize = 150, name, refine, event, onPress }) {
  const styles = memoStyles()
  let colorLevel: ColorValue
  if (level === 3) {
    colorLevel = '#b169ff'
  } else if (level === 2) {
    colorLevel = '#ffc107'
  }

  return (
    <View
      style={[
        styles.wrap,
        {
          borderColor: colorLevel,
          borderWidth: colorLevel ? 2 : 0
        }
      ]}
    >
      <Image
        style={styles.image}
        size={styles.imageResize.width}
        height={styles.imageResize.height}
        src={tinygrailOSS(cover, coverSize as 150 | 480)}
        imageViewer={!onPress}
        imageViewerSrc={tinygrailOSS(cover, 480)}
        resizeMode={
          // 高度远小于宽度的图不能 contain, 会留白
          styles.imageResize.height * 1.2 >= styles.imageResize.width ? 'cover' : 'contain'
        }
        skeletonType='tinygrail'
        event={{
          id: event?.id,
          data: {
            name,
            ...event.data
          }
        }}
        onPress={onPress}
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
}

export default ob(Cover)
