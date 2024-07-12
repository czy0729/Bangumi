/*
 * @Author: czy0729
 * @Date: 2024-02-03 19:51:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-03 20:07:31
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useObserver } from 'mobx-react'
import { Flex, Text } from '@components'
import { _, userStore } from '@stores'
import { r } from '@utils/dev'
import { IconTouchable } from '../../icon'
import { BlurView } from '../blur-view'
import { COMPONENT, HIT_SLOP } from './ds'
import { memoStyles } from './styles'

/** 主站 502 轻提示 */
export const ErrorNotice = () => {
  r(COMPONENT)

  const { bottom } = useSafeAreaInsets()
  const [show, setShow] = useState(true)

  return useObserver(() => {
    if (!userStore.websiteError || !show) return null

    const styles = memoStyles()
    return (
      <View
        style={[
          styles.errorNotice,
          {
            bottom: _.tabBarHeight + _.ios(0, bottom)
          }
        ]}
      >
        <BlurView>
          <Flex style={styles.body}>
            <Flex.Item>
              <Text type='sub' size={12} bold>
                检测到主站通信错误 (bgm.tv | 502: Bad gateway)
              </Text>
            </Flex.Item>
            <IconTouchable
              style={_.ml.sm}
              name='md-close'
              size={18}
              hitSlop={HIT_SLOP}
              onPress={() => setShow(false)}
            />
          </Flex>
        </BlurView>
      </View>
    )
  })
}
