/*
 * @Author: czy0729
 * @Date: 2019-09-14 20:37:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-19 20:59:02
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Flex } from '@components'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import MenuItem from './menu-item'
import Assets from './assets'

function Menus(props, { $ }) {
  const bids = $.list('bid').list.length
  const asks = $.list('asks').list.length
  const auction = $.list('auction').list.filter(item => item.state === 0).length
  return (
    <Flex style={styles.section} wrap='wrap'>
      <MenuItem title='热门榜单' pathname='TinygrailOverview' icon='bang-dan' />
      <MenuItem title='新番榜单' pathname='TinygrailNew' icon='xin-fan' />
      <MenuItem title='ICO榜单' pathname='TinygrailICO' icon='ico' />
      <MenuItem title='番市首富' pathname='TinygrailRich' icon='shou-fu' />
      <MenuItem title='英灵殿' pathname='TinygrailValhall' icon='app' />
      <MenuItem title='最新圣殿' pathname='TinygrailTemples' icon='break' />
      <MenuItem title='每周萌王' pathname='TinygrailTopWeek' icon='like' />
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
          backgroundColor: _.colorDepthBid
        }}
        title={`我的买单 ${bids ? `(${bids})` : ''}`}
        pathname='TinygrailBid'
        config={{
          type: 'bid'
        }}
        icon='bid'
      />
      <MenuItem
        style={{
          backgroundColor: _.colorDepthAsk
        }}
        title={`我的卖单 ${asks ? `(${asks})` : ''}`}
        pathname='TinygrailBid'
        config={{
          type: 'asks'
        }}
        icon='ask'
      />
      <MenuItem
        title={`我的拍卖 ${auction ? `(${auction})` : ''}`}
        pathname='TinygrailBid'
        config={{
          type: 'auction'
        }}
        icon='auction'
      />
      <MenuItem
        title='我的持仓'
        pathname='TinygrailCharaAssets'
        icon='package'
      />
      <MenuItem title='资金日志' pathname='TinygrailLogs' icon='ri-zhi' />
      <MenuItem title='资金分析' pathname='TinygrailTree' icon='fen-xi' />
      <MenuItem
        style={{
          backgroundColor: _.colorTinygrailActive
        }}
        title='高级分析'
        pathname='TinygrailAdvance'
        icon='meeting'
      />
      <MenuItem title='我的道具' pathname='TinygrailItems' icon='order' />
    </Flex>
  )
}

Menus.contextTypes = {
  $: PropTypes.object
}

export default observer(Menus)

const styles = StyleSheet.create({
  section: {
    paddingBottom: _.sm,
    marginLeft: _.wind
  }
})
