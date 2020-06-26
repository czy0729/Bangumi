/*
 * @Author: czy0729
 * @Date: 2020-04-06 19:19:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-27 04:34:02
 */
import React from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Text } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
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
          总资产: ₵{formatNumber(assets)} / {formatNumber(balance)}
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
        </Touchable>
      </View>
    </Animated.ScrollView>
  )
}

Tinygrail.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Tinygrail)

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: H_BG + _.space * 2,
    paddingHorizontal: _.wind,
    minHeight: _.window.height + H_BG - _.tabBarHeight
  },
  page: {
    minHeight: _.window.height - H_BG
  }
})
