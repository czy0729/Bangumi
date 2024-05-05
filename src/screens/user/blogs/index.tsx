/*
 * @Author: czy0729
 * @Date: 2020-03-22 14:18:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 16:40:53
 */
import React from 'react'
import { Component, Heatmap, ListView, Page } from '@components'
import { ItemBlog } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

const event = {
  id: '用户日志.跳转'
}

/** 用户日志 */
const UserBlogs = (props, { $, navigation }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-user-blogs'>
      <Header />
      <Page>
        <ListView
          keyExtractor={keyExtractor}
          data={$.blogs}
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
    </Component>
  ))
}

export default ic(Store, UserBlogs)
