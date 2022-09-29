/*
 * @Author: czy0729
 * @Date: 2019-05-15 15:35:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 17:41:24
 */
import React from 'react'
import { Loading, ListView, Text } from '@components'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { _ } from '@stores'
import Item from '../item'
import { Ctx } from '../types'

class List extends React.Component {
  renderItem = ({ item, index }) => <Item index={index} {...item} />

  render() {
    const { $ }: Ctx = this.context
    const { searching } = $.state
    if (searching) return <Loading style={_.container.flex} />

    if (!$.search._loaded) return null

    const { _pageTotal = 1, _filter = 0 } = $.search
    const ListFooterComponent =
      _filter > 0 ? (
        <>
          <Text style={_.mt.md} type='sub' align='center' size={12}>
            还有{Math.max((_pageTotal - 1) * 10, _filter)}+条搜索结果未显示
          </Text>
          <Text style={_.mt.xs} type='sub' align='center' size={12}>
            <Text type='warning' size={12}>
              高级会员
            </Text>
            显示所有
          </Text>
        </>
      ) : undefined

    return (
      <ListView
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        data={$.search}
        scrollToTop
        renderItem={this.renderItem}
        ListFooterComponent={ListFooterComponent}
        onFooterRefresh={$.doSearch}
      />
    )
  }
}

export default obc(List)
