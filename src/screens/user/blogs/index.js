/*
 * @Author: czy0729
 * @Date: 2020-03-22 14:18:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 00:40:10
 */
import React from 'react'
import { Page, ListView, Heatmap } from '@components'
import { ItemBlog } from '@_'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import { keyExtractor } from '@utils/app'
import Header from './header'
import Store from './store'

const event = {
  id: '用户日志.跳转'
}

const Board = (props, { $, navigation }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header />
      <Page>
        <ListView
          data={$.blogs}
          keyExtractor={keyExtractor}
          scrollToTop
          renderItem={({ item, index }) => (
            <ItemBlog
              key={item.userId}
              navigation={navigation}
              event={event}
              index={index}
              {...item}
            />
          )}
          onHeaderRefresh={$.refresh}
          onFooterRefresh={() => $.fetchBlogs()}
        />
      </Page>
      <Heatmap bottom={_.bottom} id='用户日志' screen='Blogs' />
    </>
  ))
}

export default ic(Store, Board)
