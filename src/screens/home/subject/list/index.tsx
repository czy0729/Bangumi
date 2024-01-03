/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:41:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 01:15:31
 */
import React from 'react'
import { ListView } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import Item from '../component/item'
import { Ctx } from '../types'
import HeaderComponent from '../header-component'
import { COMPONENT, REFRESH_CONTROL_PROPS } from './ds'

function List({ forwardRef, onScrollIntoViewIfNeeded, onBlockRef }, { $ }: Ctx) {
  const { _loaded } = $.subjectComments
  return (
    <ListView
      ref={forwardRef}
      style={_.container.flex}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$.subjectComments}
      scrollEventThrottle={4}
      scrollToTop
      keyboardDismissMode='on-drag'
      footerEmptyDataComponent={$.footerEmptyDataComponent}
      refreshControlProps={REFRESH_CONTROL_PROPS}
      ListHeaderComponent={
        <HeaderComponent
          loaded={!!_loaded}
          onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
          onBlockRef={onBlockRef}
        />
      }
      renderItem={renderItem}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchSubjectComments}
    />
  )
}

export default obc(List, COMPONENT)

function renderItem({ item, index }) {
  return (
    <Item
      index={index}
      time={item.time}
      avatar={item.avatar}
      userId={item.userId}
      userName={item.userName}
      star={item.star}
      comment={item.comment}
      relatedId={item.relatedId}
    />
  )
}
