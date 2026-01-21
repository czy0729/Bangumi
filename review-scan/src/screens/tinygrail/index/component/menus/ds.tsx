/*
 * @Author: czy0729
 * @Date: 2024-03-04 18:20:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-14 14:53:37
 */
import React from 'react'
import { Text } from '@components'
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'
import { MenuItems } from './types'

export const COMPONENT = rc(PARENT, 'Menus')

export const MENU_ITEMS: MenuItems = [
  {
    title: '热门榜单',
    pathname: 'TinygrailOverview',
    icon: 'md-whatshot'
  },
  // {
  //   title: '新番榜单',
  //   pathname: 'TinygrailNew',
  //   icon: 'md-local-play'
  // },
  {
    title: '番市首富',
    pathname: 'TinygrailRich',
    icon: 'md-money'
  },
  {
    title: 'ICO 榜单',
    pathname: 'TinygrailICO',
    icon: 'md-attach-money'
  },
  {
    title: '每周萌王',
    pathname: 'TinygrailTopWeek',
    icon: 'md-favorite-outline'
  },
  {
    title: '英灵殿',
    pathname: 'TinygrailValhall',
    icon: 'md-looks'
  },
  {
    title: '最新圣殿',
    pathname: 'TinygrailTemples',
    icon: 'md-image-aspect-ratio'
  },
  {
    title: '通天塔 (β)',
    pathname: 'TinygrailStar',
    icon: 'md-change-history'
  },
  {
    title: '圣杯广场',
    pathname: 'TinygrailTransaction',
    icon: 'md-data-usage',
    style: () => ({
      backgroundColor: _.colorTinygrailActive
    })
  },
  {
    title: '资产'
  },
  {
    title: '我的买单',
    dynamicTitle: (title: string, bid: number) => (
      <>
        {title}
        <CountText count={bid} />
      </>
    ),
    pathname: 'TinygrailBid',
    config: {
      type: 'bid'
    },
    icon: 'md-add-circle-outline',
    style: () => ({
      backgroundColor: _.colorDepthBid
    })
  },
  {
    title: '我的卖单',
    dynamicTitle: (title: string, asks: number) => (
      <>
        {title}
        <CountText count={asks} />
      </>
    ),
    pathname: 'TinygrailBid',
    config: {
      type: 'asks'
    },
    icon: 'md-remove-circle-outline',
    style: () => ({
      backgroundColor: _.colorDepthAsk
    })
  },
  {
    title: '我的拍卖',
    dynamicTitle: (title: string, auction: number) => (
      <>
        {title}
        <CountText count={auction} />
      </>
    ),
    pathname: 'TinygrailBid',
    config: {
      type: 'auction'
    },
    icon: 'md-gavel'
  },
  {
    title: '我的持仓',
    pathname: 'TinygrailCharaAssets',
    icon: 'md-inbox'
  },
  {
    title: '资金日志',
    pathname: 'TinygrailLogs',
    icon: 'md-insert-chart-outlined'
  },
  {
    title: '人物搜索',
    pathname: 'TinygrailSearch',
    icon: 'md-search'
  },
  {
    title: '游戏指南',
    pathname: 'TinygrailWiki',
    icon: 'md-chrome-reader-mode'
  },
  {
    title: '我的道具',
    pathname: 'TinygrailItems',
    icon: 'md-workspaces-outline'
  }
] as const

const CountText = ({ count }: { count: number }) => (
  <Text type='tinygrailPlain' size={15} lineHeight={19} bold>
    {'  '}
    {count || ''}
  </Text>
)
