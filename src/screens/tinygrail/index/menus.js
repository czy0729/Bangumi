/*
 * @Author: czy0729
 * @Date: 2019-09-14 20:37:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-19 18:14:40
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import MenuItem from './menu-item'
import Assets from './assets'

function Menus(props, { $ }) {
  const bids = $.list('bid').list.length
  const asks = $.list('asks').list.length
  const auction = $.list('auction').list.filter(item => item.state === 0).length
  return (
    <Flex style={styles.section} wrap='wrap'>
      <MenuItem
        title='热门榜单'
        pathname='TinygrailOverview'
        icon='md-whatshot'
      />
      <MenuItem title='新番榜单' pathname='TinygrailNew' icon='md-local-play' />
      <MenuItem
        title='ICO榜单'
        pathname='TinygrailICO'
        icon='md-attach-money'
      />
      <MenuItem title='番市首富' pathname='TinygrailRich' icon='md-money' />
      <MenuItem title='英灵殿' pathname='TinygrailValhall' icon='md-looks' />
      <MenuItem
        title='最新圣殿'
        pathname='TinygrailTemples'
        icon='md-image-aspect-ratio'
      />
      <MenuItem
        title='每周萌王'
        pathname='TinygrailTopWeek'
        icon='md-favorite-outline'
      />
      <MenuItem
        title='通天塔(α)'
        pathname='TinygrailStar'
        icon='md-change-history'
      />
      <Assets />
      <MenuItem
        style={{
          backgroundColor: _.colorDepthBid
        }}
        title={
          <>
            我的买单
            <Text type='tinygrailPlain' size={15} lineHeight={19} bold>
              {'  '}
              {bids || ''}
            </Text>
          </>
        }
        pathname='TinygrailBid'
        config={{
          type: 'bid'
        }}
        icon='md-add-circle-outline'
      />
      <MenuItem
        style={{
          backgroundColor: _.colorDepthAsk
        }}
        title={
          <>
            我的卖单
            <Text type='tinygrailPlain' size={15} lineHeight={19} bold>
              {'  '}
              {asks || ''}
            </Text>
          </>
        }
        pathname='TinygrailBid'
        config={{
          type: 'asks'
        }}
        icon='md-remove-circle-outline'
      />
      <MenuItem
        title={
          <>
            我的拍卖
            <Text type='tinygrailPlain' size={15} lineHeight={19} bold>
              {'  '}
              {auction || ''}
            </Text>
          </>
        }
        pathname='TinygrailBid'
        config={{
          type: 'auction'
        }}
        icon='md-gavel'
      />
      <MenuItem
        title='我的持仓'
        pathname='TinygrailCharaAssets'
        icon='md-inbox'
      />
      <MenuItem
        title='资金日志'
        pathname='TinygrailLogs'
        icon='md-insert-chart-outlined'
      />
      <MenuItem title='人物查询' pathname='TinygrailSearch' icon='md-search' />
      <MenuItem
        style={{
          backgroundColor: _.colorTinygrailActive
        }}
        title='高级功能'
        pathname='TinygrailAdvance'
        icon='md-card-membership'
      />
      <MenuItem
        title='我的道具'
        pathname='TinygrailItems'
        icon='md-workspaces-outline'
      />
    </Flex>
  )
}

export default obc(Menus)

const styles = _.create({
  section: {
    paddingBottom: _.sm,
    marginLeft: _.wind
  }
})
