/*
 * @Author: czy0729
 * @Date: 2019-09-14 20:37:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-22 02:57:30
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Iconfont } from '@components'
import { formatNumber } from '@utils'
import { observer } from '@utils/decorators'
import _ from '@styles'
import { colorBid, colorAsk, colorDepthBid, colorDepthAsk } from '../styles'
import MenuItem from './menu-item'

function Menus(props, { $ }) {
  const { currentBalance, currentTotal, lastBalance, lastTotal } = $.state
  const { balance } = $.assets

  const changeBalance = currentBalance - lastBalance
  const changeTotal = currentTotal - lastTotal

  let balanceChangeText
  let balanceTextColor
  if (changeBalance > 0) {
    balanceChangeText = `(+${formatNumber(changeBalance, 0)})`
    balanceTextColor = colorBid
  } else if (changeBalance < 0) {
    balanceChangeText = `(${formatNumber(changeBalance, 0)})`
    balanceTextColor = colorAsk
  }

  let totalChangeText
  let totalTextColor
  if (changeTotal > 0) {
    totalChangeText = `(+${formatNumber(changeTotal, 0)})`
    totalTextColor = colorBid
  } else if (changeTotal < 0) {
    totalChangeText = `(${formatNumber(changeTotal, 0)})`
    totalTextColor = colorAsk
  }

  return (
    <Flex style={styles.section} wrap='wrap'>
      <MenuItem title='交易榜单' pathname='TinygrailOverview' icon='bang-dan' />
      <MenuItem title='新番榜单' pathname='TinygrailNew' icon='xin-fan' />
      <MenuItem title='ICO榜单' pathname='TinygrailICO' icon='ico' />
      <MenuItem title='番市首富' pathname='TinygrailRich' icon='shou-fu' />
      <MenuItem title='人物直达' pathname='TinygrailSearch' icon='navigation' />
      <MenuItem
        title='小组讨论'
        pathname='Group'
        config={{
          groupId: 'tinygrail'
        }}
        icon='planet'
      />

      <Flex style={styles.assets}>
        <Iconfont name='licheng' color={_.colorPlain} />
        <Text style={_.ml.sm} size={15} type='plain'>
          {formatNumber(balance)}{' '}
          {balanceChangeText && (
            <Text
              style={{
                color: balanceTextColor
              }}
              size={12}
              lineHeight={15}
            >
              {balanceChangeText}
            </Text>
          )}{' '}
          / {formatNumber($.total)}{' '}
          {totalChangeText && (
            <Text
              style={{
                color: totalTextColor
              }}
              size={12}
              lineHeight={15}
            >
              {totalChangeText}
            </Text>
          )}
        </Text>
      </Flex>

      <MenuItem
        style={{
          backgroundColor: colorDepthBid
        }}
        title='我的买单'
        pathname='TinygrailBid'
        config={{
          type: 'bid'
        }}
        icon='bid'
      />
      <MenuItem
        style={{
          backgroundColor: colorDepthAsk
        }}
        title='我的卖单'
        pathname='TinygrailBid'
        config={{
          type: 'asks'
        }}
        icon='ask'
      />
      {/* <MenuItem title='我的收藏' pathname='TinygrailFavor' icon='star' /> */}
      <MenuItem
        title='我的持仓'
        pathname='TinygrailCharaAssets'
        icon='chi-cang'
      />
      <MenuItem title='资金日志' pathname='TinygrailLogs' icon='ri-zhi' />
      {/* <MenuItem title='资金分布' pathname='TinygrailAnalysis' icon='fen-xi' /> */}
    </Flex>
  )
}

Menus.contextTypes = {
  $: PropTypes.object
}

export default observer(Menus)

const styles = StyleSheet.create({
  section: {
    paddingBottom: _.wind,
    marginTop: -8,
    marginLeft: _.wind
  },
  assets: {
    width: '100%',
    marginTop: _.sm,
    marginBottom: _.sm
  }
})
