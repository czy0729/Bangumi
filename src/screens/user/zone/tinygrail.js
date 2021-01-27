/*
 * @Author: czy0729
 * @Date: 2020-04-06 19:19:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:02:33
 */
import React from 'react'
import { View, Animated } from 'react-native'
import { Touchable, Text, Heatmap } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HTMLDecode } from '@utils/html'
import { H_BG } from './store'

function Tinygrail(props, { $, navigation }) {
  const { assets, balance, lastIndex } = $.userAssets
  const { nickname } = $.usersInfo
  return (
    <Animated.ScrollView
      contentContainerStyle={styles.contentContainerStyle}
      {...props}
    >
      <View style={styles.page}>
        <Text style={_.mt.lg}>
          总资产: {formatNumber(assets)} / {formatNumber(balance)}
          {lastIndex !== 0 && ` / #${lastIndex}`}
        </Text>
        <Text style={_.mt.sm}>{$.templeTotal}座圣殿</Text>
        <Text style={_.mt.sm}>{$.charaTotal}个人物</Text>
        <Touchable
          style={_.mt.lg}
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
          <Text underline>查看TA的持仓</Text>
          <Heatmap
            id='空间.跳转'
            data={{
              to: 'TinygrailCharaAssets',
              alias: '小圣杯持仓'
            }}
          />
        </Touchable>
      </View>
    </Animated.ScrollView>
  )
}

export default obc(Tinygrail)

const styles = _.create({
  contentContainerStyle: {
    paddingTop: H_BG + _.space * 2,
    paddingHorizontal: _.wind,
    minHeight: _.window.height + H_BG - _.tabBarHeight
  },
  page: {
    minHeight: _.window.height - H_BG
  }
})
