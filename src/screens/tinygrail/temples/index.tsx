/*
 * @Author: czy0729
 * @Date: 2019-12-23 13:55:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 18:53:14
 */
import React from 'react'
import { Component, Header, ListView, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import ItemTemple from '@tinygrail/_/item-temple'
import { refreshControlProps } from '@tinygrail/styles'
import { NavigationProps } from '@types'
import { useTinygrailTemplesPage } from './hooks'
import { memoStyles } from './styles'

const EVENT = {
  id: '最近圣殿.跳转'
} as const

/** 通天塔 */
const TinygrailTemples = (props: NavigationProps) => {
  const { id, $ } = useTinygrailTemplesPage(props)

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='screen-tinygrail-temples'>
        <StoreContext.Provider value={id}>
          <Header
            title='最新圣殿'
            hm={['tinygrail/temples', 'TinygrailTemples']}
            statusBarEvents={false}
            statusBarEventsType='Tinygrail'
          />
          <Page
            style={_.container.tinygrail}
            loaded={$.templeLast._loaded}
            loadingColor={_.colorTinygrailText}
          >
            <ListView
              style={_.container.flex}
              contentContainerStyle={styles.contentContainerStyle}
              keyExtractor={keyExtractor}
              refreshControlProps={refreshControlProps}
              footerTextType='tinygrailText'
              numColumns={3}
              data={$.templeLast}
              windowSize={6}
              initialNumToRender={24}
              maxToRenderPerBatch={24}
              updateCellsBatchingPeriod={24}
              lazy={24}
              scrollToTop
              renderItem={renderItem}
              onHeaderRefresh={$.onHeaderRefresh}
              onFooterRefresh={$.fetchTempleLast}
            />
          </Page>
        </StoreContext.Provider>
      </Component>
    )
  })
}

export default TinygrailTemples

function keyExtractor(item: { id: any; userId: any }) {
  return `${item.id}|${item.userId}`
}

function renderItem({ item, index }) {
  return <ItemTemple index={index} type='view' event={EVENT} {...item} />
}
