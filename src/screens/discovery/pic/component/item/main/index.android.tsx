/*
 * @Author: czy0729
 * @Date: 2025-06-18 03:19:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-11 09:49:18
 */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { findNodeHandle, Image, UIManager, View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components' // 引入 Flex, Text
import { _, systemStore } from '@stores' // 引入 _ 以获取主题配置
import { s2t } from '@utils/thirdParty/open-cc'
import { FROZEN_FN } from '@constants'
import { getURI } from '../../../utils'
import { memoStyles } from './styles'

function Main({ width, height, data, image, onPress, onSelect }) {
  const viewRef = useRef<View>(null)

  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsError(false)
  }, [image])

  const handleLongPress = useCallback(() => {
    if (!viewRef.current) return

    // @ts-expect-error
    UIManager.showPopupMenu(
      findNodeHandle(viewRef.current),
      systemStore.setting.s2t
        ? data.map((item: string) => (typeof item === 'string' ? s2t(item) : item))
        : data,
      FROZEN_FN,
      (_event: any, index: number) => onSelect(data[index])
    )
  }, [data, onSelect])

  const styles = memoStyles()

  return (
    <View>
      <View ref={viewRef} style={styles.overflowView} pointerEvents='none' />

      <Touchable
        style={styles.image}
        onPress={onPress}
        onLongPress={handleLongPress}
        withoutFeedback
      >
        {isError ? (
          <Flex style={{ width, height }} justify='center'>
            <Text type={_.select('sub', 'icon')} size={16} bold>
              404
            </Text>
          </Flex>
        ) : (
          <Image
            style={{ width, height }}
            fadeDuration={280}
            source={{
              uri: getURI(image)
            }}
            onError={() => setIsError(true)}
          />
        )}
      </Touchable>
    </View>
  )
}

export default observer(Main)
