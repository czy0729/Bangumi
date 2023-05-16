/*
 * @Author: czy0729
 * @Date: 2019-05-15 15:35:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-16 07:18:56
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

    const { _filter = 0 } = $.search
    const ListFooterComponent =
      _filter > 0 ? (
        <>
          <Text style={_.mt.lg} type='sub' align='center' size={13} bold>
            非会员只显示 8 条结果
          </Text>
          <Text style={_.mt.xs} type='sub' align='center' size={13} bold>
            高级会员显示 20 条结果
          </Text>
        </>
      ) : undefined

    return (
      <ListView
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        data={$.search}
        renderItem={this.renderItem}
        ListFooterComponent={ListFooterComponent}
      />
    )
  }
}

export default obc(List)
