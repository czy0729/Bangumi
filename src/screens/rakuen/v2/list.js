/*
 * @Author: czy0729
 * @Date: 2019-04-27 19:30:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-16 13:02:55
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { Login } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import Item from './item'
import { H_TABBAR } from './store'

const contentInset = IOS
  ? {
      top: _.headerHeight + H_TABBAR
    }
  : undefined
const contentOffset = IOS
  ? {
      y: -(_.headerHeight + H_TABBAR)
    }
  : undefined

function List({ index }, { $ }) {
  rerender('Rakuen.List')

  const type = $.type(index)
  if (type === 'hot' && !$.isWebLogin) {
    return <Login text='热门帖子需登陆才能显示' btnText='去登陆' />
  }

  const rakuen = $.rakuen(type)
  if (!rakuen._loaded) return <Loading />

  const { page, isFocused } = $.state
  return (
    <ListView
      ref={ref => $.connectRef(ref, index)}
      style={!IOS && styles.androidWrap}
      contentContainerStyle={styles.contentContainerStyle}
      keyExtractor={keyExtractor}
      data={rakuen}
      lazy={12}
      contentInset={contentInset}
      contentOffset={contentOffset}
      renderItem={renderItem}
      scrollToTop={isFocused && page === index}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchRakuen}
    />
  )
}

export default obc(List)

const styles = _.create({
  androidWrap: {
    marginBottom: _.tabBarHeight - 1
  },
  contentContainerStyle: {
    paddingBottom: IOS ? _.bottom : _.bottom - _.tabBarHeight
  }
})

function keyExtractor(item) {
  return item.href
}

function renderItem({ item, index }) {
  return <Item index={index} {...item} />
}
