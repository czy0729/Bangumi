/*
 * @Author: czy0729
 * @Date: 2019-09-14 20:37:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-17 21:55:10
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Flex } from '@components'
import _ from '@styles'
import { colorDepthBid, colorDepthAsk } from '../styles'
import MenuItem from './menu-item'
import Assets from './assets'

function Menus() {
  return (
    <Flex style={styles.section} wrap='wrap'>
      <MenuItem title='热门榜单' pathname='TinygrailOverview' icon='bang-dan' />
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
      <Assets />
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

export default Menus

const styles = StyleSheet.create({
  section: {
    paddingBottom: _.wind,
    marginLeft: _.wind
  }
})
