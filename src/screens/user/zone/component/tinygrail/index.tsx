/*
 * @Author: czy0729
 * @Date: 2020-04-06 19:19:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-29 12:54:56
 */
import React, { useCallback } from 'react'
import { Animated, View } from 'react-native'
import { Flex, Heatmap, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { formatNumber, HTMLDecode } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { SCROLL_VIEW_RESET_PROPS, USE_NATIVE_DRIVER } from '@constants'
import { TABS_WITH_TINYGRAIL } from '../../ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Tinygrail(props: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handleRef = useCallback(
    (ref: any) => {
      $.forwardRef(
        ref,
        TABS_WITH_TINYGRAIL.findIndex(item => item.title === '小圣杯')
      )
    },
    [$]
  )
  const handlePress = useCallback(() => {
    navigation.push('TinygrailCharaAssets', {
      userId: $.username,
      userName: HTMLDecode($.usersInfo.nickname),
      from: 'tinygrail'
    })

    t('空间.跳转', {
      userId: $.userId,
      to: 'TinygrailCharaAssets'
    })
  }, [$, navigation])

  return useObserver(() => {
    const styles = memoStyles()
    const { assets, balance, lastIndex } = $.userAssets

    return (
      <Animated.ScrollView
        ref={handleRef}
        contentContainerStyle={styles.contentContainerStyle}
        {...props}
        {...SCROLL_VIEW_RESET_PROPS}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: $.scrollY
                }
              }
            }
          ],
          {
            useNativeDriver: USE_NATIVE_DRIVER,
            listener: props.onScroll
          }
        )}
      >
        <View style={styles.page}>
          <Text style={_.mt.lg}>
            总资产: {formatNumber(assets)} / {formatNumber(balance)}
            {lastIndex !== 0 && ` / #${lastIndex}`}
          </Text>
          <Text style={_.mt.sm}>{$.templeTotal}座圣殿</Text>
          <Text style={_.mt.sm}>{$.charaTotal}个人物</Text>
          <Flex style={_.mt.lg} justify='center'>
            <Touchable style={styles.touch} onPress={handlePress}>
              <Text type={_.select('desc', 'main')} bold>
                查看TA的持仓
              </Text>
              <Heatmap id='空间.跳转' to='TinygrailCharaAssets' alias='小圣杯持仓' />
            </Touchable>
          </Flex>
        </View>
      </Animated.ScrollView>
    )
  })
}

export default Tinygrail
