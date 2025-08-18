/*
 * @Author: czy0729
 * @Date: 2019-05-15 15:35:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 02:17:18
 */
import React from 'react'
import { ListView, Loading, Text } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { r } from '@utils/dev'
import { Ctx } from '../../types'
import Item from '../item'
import { COMPONENT } from './ds'

class List extends React.Component<Ctx> {
  renderItem = ({ item, index }) => <Item index={index} {...item} />

  render() {
    r(COMPONENT)

    const { $ } = this.props
    const { searching } = $.state
    if (searching) return <Loading style={_.container.flex} />

    if (!$.search._loaded) return null

    const { _filter = 0 } = $.search
    const ListFooterComponent =
      _filter > 0 ? (
        <>
          <Text style={_.mt.lg} type='sub' align='center' size={13} bold>
            非会员仅显示 8 条结果
          </Text>
          <Text style={_.mt.xs} type='sub' align='center' size={13} bold>
            高级会员显示 20 条结果
          </Text>
        </>
      ) : undefined

    return (
      <ListView
        keyExtractor={keyExtractor}
        contentContainerStyle={_.container.bottom}
        data={$.search}
        renderItem={this.renderItem}
        ListFooterComponent={ListFooterComponent}
        onScroll={$.onScroll}
      />
    )
  }
}

export default ob(List)
