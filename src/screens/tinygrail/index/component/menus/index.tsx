/*
 * @Author: czy0729
 * @Date: 2019-09-14 20:37:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 22:45:54
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Assets from '../assets'
import MenuItem from '../menu-item'
import { COMPONENT } from './ds'

function Menus(props, { $ }: Ctx) {
  const bids = $.list('bid').list.length
  const asks = $.list('asks').list.length
  const auction = $.list('auction').list.filter(item => item.state === 0).length
  return (
    <Flex style={_.mt.sm} wrap='wrap'>
      <MenuItem index={0} title='热门榜单' pathname='TinygrailOverview' icon='md-whatshot' />
      <MenuItem index={1} title='新番榜单' pathname='TinygrailNew' icon='md-local-play' />
      <MenuItem index={2} title='ICO 榜单' pathname='TinygrailICO' icon='md-attach-money' />
      <MenuItem index={3} title='番市首富' pathname='TinygrailRich' icon='md-money' />
      <MenuItem index={4} title='英灵殿' pathname='TinygrailValhall' icon='md-looks' />
      <MenuItem
        index={5}
        title='最新圣殿'
        pathname='TinygrailTemples'
        icon='md-image-aspect-ratio'
      />
      <MenuItem index={6} title='每周萌王' pathname='TinygrailTopWeek' icon='md-favorite-outline' />
      <MenuItem index={7} title='通天塔 (β)' pathname='TinygrailStar' icon='md-change-history' />
      <Assets />
      <MenuItem
        index={8}
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
        index={9}
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
        index={10}
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
      <MenuItem index={11} title='我的持仓' pathname='TinygrailCharaAssets' icon='md-inbox' />
      <MenuItem
        index={12}
        title='资金日志'
        pathname='TinygrailLogs'
        icon='md-insert-chart-outlined'
      />
      <MenuItem index={13} title='人物查询' pathname='TinygrailSearch' icon='md-search' />
      <MenuItem
        index={14}
        style={{
          backgroundColor: _.colorTinygrailActive
        }}
        title='高级功能'
        pathname='TinygrailAdvance'
        icon='md-card-membership'
      />
      <MenuItem
        index={15}
        title='我的道具'
        pathname='TinygrailItems'
        icon='md-workspaces-outline'
      />
    </Flex>
  )
}

export default obc(Menus, COMPONENT)
