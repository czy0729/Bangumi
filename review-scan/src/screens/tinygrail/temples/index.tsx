/*
 * @Author: czy0729
 * @Date: 2019-12-23 13:55:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-19 04:38:21
 */
import React from 'react'
import { Component, HeaderV2, ListView, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import ItemTemple from '@tinygrail/_/item-temple'
import { refreshControlProps } from '@tinygrail/styles'
import { NavigationProps } from '@types'
import { useTinygrailTemplesPage } from './hooks'
import { EVENT, HM } from './ds'
import { memoStyles } from './styles'

/** 最新圣殿 */
const TinygrailTemples = (props: NavigationProps) => {
  const { id, $ } = useTinygrailTemplesPage(props)

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='screen-tinygrail-temples'>
        <StoreContext.Provider value={id}>
          <Page
            style={_.container.tinygrail}
            loaded={$.templeLast._loaded}
            loadingColor={_.colorTinygrailText}
          >
            <ListView
              keyExtractor={keyExtractor}
              contentContainerStyle={styles.contentContainerStyle}
              refreshControlProps={refreshControlProps}
              footerTextType='tinygrailText'
              numColumns={3}
              data={$.templeLast}
              renderItem={renderItem}
              onHeaderRefresh={$.onHeaderRefresh}
              onFooterRefresh={$.fetchTempleLast}
            />
          </Page>
          <HeaderV2 backgroundStyle={_.container.tinygrail} title='最新圣殿' hm={HM} />
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
