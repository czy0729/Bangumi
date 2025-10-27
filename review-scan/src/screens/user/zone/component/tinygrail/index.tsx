/*
 * @Author: czy0729
 * @Date: 2020-04-06 19:19:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:20:42
 */
import React from 'react'
import { Animated, View } from 'react-native'
import { Flex, Heatmap, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { formatNumber, HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { SCROLL_VIEW_RESET_PROPS, USE_NATIVE_DRIVER } from '@constants'
import { TABS_WITH_TINYGRAIL } from '../../ds'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Tinygrail(props) {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const { onScroll } = props
  const { assets, balance, lastIndex } = $.userAssets
  const { nickname } = $.usersInfo
  return (
    <Animated.ScrollView
      ref={ref => {
        const index = TABS_WITH_TINYGRAIL.findIndex(item => item.title === '小圣杯')
        return $.connectRef(ref, index)
      }}
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
          listener: onScroll
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
          <Touchable
            style={styles.touch}
            onPress={() => {
              t('空间.跳转', {
                userId: $.userId,
                to: 'TinygrailCharaAssets'
              })

              navigation.push('TinygrailCharaAssets', {
                userId: $.username,
                userName: HTMLDecode(nickname),
                from: 'tinygrail'
              })
            }}
          >
            <Text type={_.select('desc', 'main')} bold>
              查看TA的持仓
            </Text>
            <Heatmap id='空间.跳转' to='TinygrailCharaAssets' alias='小圣杯持仓' />
          </Touchable>
        </Flex>
      </View>
    </Animated.ScrollView>
  )
}

export default ob(Tinygrail, COMPONENT)
