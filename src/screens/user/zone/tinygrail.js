/*
 * @Author: czy0729
 * @Date: 2020-04-06 19:19:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-09 14:15:52
 */
import React from 'react'
import { View, Animated } from 'react-native'
import { Touchable, Flex, Text, Heatmap } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HTMLDecode } from '@utils/html'
import { H_BG } from './store'
import { TABS_WITH_TINYGRAIL } from './ds'

function Tinygrail(props, { $, navigation }) {
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
            <Heatmap
              id='空间.跳转'
              data={{
                to: 'TinygrailCharaAssets',
                alias: '小圣杯持仓'
              }}
            />
          </Touchable>
        </Flex>
      </View>
    </Animated.ScrollView>
  )
}

export default obc(Tinygrail)

const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingTop: H_BG + _.space * 2,
    paddingHorizontal: _.wind,
    minHeight: _.window.height + H_BG - _.tabBarHeight
  },
  page: {
    minHeight: _.window.height - H_BG
  },
  touch: {
    paddingVertical: _.sm,
    paddingHorizontal: _.md,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
