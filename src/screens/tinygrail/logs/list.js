/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:18:04
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { obc } from '@utils/decorators'
import Item from './item'
import { tabs } from './store'

function List({ title }, { $ }) {
  if (!$.balance._loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
  }

  let data
  switch (title) {
    case '刮刮乐':
      data = {
        ...$.balance,
        list: $.balance.list.filter(item => item.desc.includes('刮刮乐'))
      }
      break
    case '道具':
      data = {
        ...$.balance,
        list: $.balance.list.filter(item => item.desc.includes('使用「'))
      }
      break
    case '卖出':
      data = {
        ...$.balance,
        list: $.balance.list.filter(
          item => item.desc.includes('卖出') && item.change > 0
        )
      }
      break
    case '买入':
      data = {
        ...$.balance,
        list: $.balance.list.filter(
          item => item.desc.includes('买入') && item.change < 0
        )
      }
      break
    case '圣殿':
      data = {
        ...$.balance,
        list: $.balance.list.filter(item => item.desc.includes('融资'))
      }
      break
    case '竞拍':
      data = {
        ...$.balance,
        list: $.balance.list.filter(item => item.desc.includes('竞拍'))
      }
      break
    case 'ICO':
      data = {
        ...$.balance,
        list: $.balance.list.filter(item => item.desc.includes('ICO'))
      }
      break
    case '分红':
      data = {
        ...$.balance,
        list: $.balance.list.filter(
          item => item.desc.includes('分红') || item.desc.includes('奖励')
        )
      }
      break
    default:
      data = $.balance
      break
  }

  const { page } = $.state
  return (
    <ListView
      style={_.container.flex}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      refreshControlProps={{
        color: _.colorTinygrailText
      }}
      footerTextType='tinygrailText'
      data={data}
      scrollToTop={tabs[page].title === title}
      renderItem={renderItem}
      onHeaderRefresh={() => $.fetchBalance()}
    />
  )
}

export default obc(List, {
  title: '全部'
})

function renderItem({ item, index }) {
  return <Item index={index} {...item} />
}
