/*
 * @Author: czy0729
 * @Date: 2019-12-23 13:55:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 16:28:05
 */
import React from 'react'
import { Header, ListView, Page } from '@components'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import ItemTemple from '@tinygrail/_/item-temple'
import { refreshControlProps } from '@tinygrail/styles'
import Store from './store'
import { memoStyles } from './styles'
import { Ctx } from './types'

const EVENT = {
  id: '最近圣殿.跳转'
} as const

/** 最新圣殿 */
class TinygrailTemples extends React.Component {
  componentDidMount() {
    const { $ } = this.context as Ctx
    $.onHeaderRefresh()
  }

  render() {
    const { $ } = this.context as Ctx
    const { _loaded } = $.templeLast
    return (
      <>
        <Header
          title='最新圣殿'
          hm={['tinygrail/temples', 'TinygrailTemples']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
        />
        <Page style={_.container.tinygrail} loaded={_loaded} loadingColor={_.colorTinygrailText}>
          <ListView
            style={_.container.flex}
            contentContainerStyle={this.styles.contentContainerStyle}
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
      </>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default inject(Store)(obc(TinygrailTemples))

function keyExtractor(item: { id: any; userId: any }) {
  return `${item.id}|${item.userId}`
}

function renderItem({ item, index }) {
  return <ItemTemple index={index} type='view' event={EVENT} {...item} />
}
