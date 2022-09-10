/*
 * @Author: czy0729
 * @Date: 2019-04-27 19:30:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-09 13:41:17
 */
import React from 'react'
import { Loading } from '@components'
import { Login, PaginationList2 } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import i18n from '@constants/i18n'
import Item from '../item'
import { Ctx } from '../types'
import { styles } from './styles'

function List({ index }, { $ }: Ctx) {
  global.rerender('Rakuen.List')

  const type = $.type(index)
  if (type === 'hot' && !$.isWebLogin) {
    return (
      <Login text={`热门帖子需${i18n.login()}才能显示`} btnText={`去${i18n.login()}`} />
    )
  }

  const rakuen = $.rakuen(type)
  if (!rakuen._loaded) return <Loading />

  const { page, isFocused } = $.state
  return (
    <PaginationList2
      key={type}
      keyExtractor={keyExtractor}
      connectRef={ref => $.connectRef(ref, index)}
      contentContainerStyle={styles.contentContainerStyle}
      data={rakuen.list}
      limit={24}
      progressViewOffset={_.ios(styles.contentContainerStyle.paddingTop - _.sm, 0)}
      renderItem={renderItem}
      scrollToTop={isFocused && page === index}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchRakuen}
    />
  )
}

export default obc(List)

function keyExtractor(item: { href: any }) {
  return item.href
}

function renderItem({ item, index }) {
  return <Item index={index} {...item} />
}
