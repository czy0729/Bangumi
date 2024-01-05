/*
 * @Author: czy0729
 * @Date: 2019-04-27 19:30:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 23:14:41
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { Login } from '@_'
import { obc } from '@utils/decorators'
import i18n from '@constants/i18n'
import { Ctx } from '../../types'
import Item from '../item'
import { COMPONENT } from './ds'
import { styles } from './styles'

function List({ index }, { $ }: Ctx) {
  const type = $.type(index)
  if (type === 'hot' && !$.isWebLogin) {
    return <Login text={`热门帖子需${i18n.login()}才能显示`} btnText={`去${i18n.login()}`} />
  }

  const rakuen = $.rakuen(type)
  if (!rakuen._loaded) return <Loading />

  return (
    <ListView
      key={type}
      keyExtractor={keyExtractor}
      ref={ref => $.connectRef(ref, index)}
      contentContainerStyle={styles.contentContainerStyle}
      data={rakuen}
      progressViewOffset={styles.contentContainerStyle.paddingTop}
      renderItem={renderItem}
      scrollEventThrottle={4}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchRakuen}
    />
  )
}

export default obc(List, COMPONENT)

function keyExtractor(item: { href: any }) {
  return item.href
}

function renderItem({ item, index }) {
  return <Item index={index} {...item} />
}
