/*
 * @Author: czy0729
 * @Date: 2019-11-28 16:57:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-11 20:33:34
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { SectionHeader } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import IconFavor from './icon-favor'
import Item from './item'
import Store from './store'

const title = '本地帖子'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['rakuen/history', 'RakuenHistory']
})
@obc
class RakuenHistory extends React.Component {
  static navigationOptions = {
    title: '收藏'
  }

  async componentDidMount() {
    const { $, navigation } = this.context
    await $.init()

    navigation.setParams({
      title: '收藏',
      extra: <IconFavor $={$} />
    })
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    if (!_loaded) {
      return <Loading style={_.container.screen} />
    }

    return (
      <ListView
        key={$.sections.length}
        style={_.container.screen}
        keyExtractor={keyExtractor}
        sections={$.sections}
        scrollToTop
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
      />
    )
  }
}

function keyExtractor(item) {
  return String(item.topicId)
}

function renderSectionHeader({ section: { title } }) {
  return <SectionHeader size={14}>{title}</SectionHeader>
}

function renderItem({ item, index }) {
  return <Item index={index} {...item} />
}
