/*
 * @Author: czy0729
 * @Date: 2020-04-06 19:19:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-22 09:47:08
 */
import React from 'react'
import { View, Animated } from 'react-native'
import { Touchable, Flex, Text, Heatmap } from '@components'
import { _ } from '@stores'
import { HTMLDecode, formatNumber } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { TABS_WITH_TINYGRAIL } from '../ds'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Tinygrail(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
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
            <Text>查看TA的持仓</Text>
            <Heatmap id='空间.跳转' to='TinygrailCharaAssets' alias='小圣杯持仓' />
          </Touchable>
        </Flex>
      </View>
    </Animated.ScrollView>
  )
}

export default obc(Tinygrail)
