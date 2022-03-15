/*
 * @Author: czy0729
 * @Date: 2019-12-23 13:55:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 03:20:27
 */
import React from 'react'
import { Header, Page, ListView } from '@components'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import { refreshControlProps } from '@tinygrail/styles'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import ItemTemple from '@tinygrail/_/item-temple'
import Store from './store'

const event = {
  id: '最近圣殿.跳转'
}

export default
@inject(Store)
@obc
class TinygrailTemples extends React.Component {
  componentDidMount() {
    const { $ } = this.context
    $.onHeaderRefresh()
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.templeLast
    return (
      <>
        <StatusBarEvents />
        <Header
          title='最新圣殿'
          hm={['tinygrail/temples', 'TinygrailTemples']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
        />
        <Page
          style={_.container.tinygrail}
          loaded={_loaded}
          loadingColor={_.colorTinygrailText}
        >
          <ListView
            style={_.container.flex}
            contentContainerStyle={this.styles.contentContainerStyle}
            keyExtractor={keyExtractor}
            refreshControlProps={refreshControlProps}
            footerTextType='tinygrailText'
            numColumns={3}
            data={$.templeLast}
            lazy={12}
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

const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingHorizontal: _.wind - _._wind,
    paddingBottom: _.bottom
  }
}))

function keyExtractor(item) {
  return `${item.id}|${item.userId}`
}

function renderItem({ item, index }) {
  return <ItemTemple index={index} type='view' event={event} {...item} />
}
