/*
 * @Author: czy0729
 * @Date: 2019-06-23 02:20:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:21:23
 */
import React from 'react'
import { Loading, Text, Touchable } from '@components'
import { Filter, PaginationList2 } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { r } from '@utils/dev'
import { ADVANCE_LIMIT, filterDS } from '../../ds'
import { Ctx } from '../../types'
import Item from '../item'
import ItemGrid from '../item-grid'
import { keyExtractor } from './utils'
import { COMPONENT } from './ds'

class List extends React.Component<Ctx> {
  connectRef = (ref: { scrollToOffset: any }) => {
    if (ref && ref.scrollToOffset) {
      const { $ } = this.props
      $.scrollToOffset = ref.scrollToOffset
    }
  }

  get num() {
    return _.portrait(3, 5)
  }

  renderItem = ({ item: pickIndex, index }) => {
    const { $ } = this.props
    if ($.isList) return <Item pickIndex={pickIndex} />

    return <ItemGrid pickIndex={pickIndex} index={index} num={this.num} />
  }

  renderFilter() {
    return (
      <Filter
        filterDS={filterDS}
        name='NSFW'
        type='NSFW'
        lastUpdate='2024-07'
        information={`数据最后快照于 2024-07-22，在版本更新前数据不会有任何变化。
        \n本页数据非来源自 bgm.tv，并非所有条目都进行了收录。
        \n有比 bgm.tv 更准确的分类、更丰富的筛选和更多的排序。
        \n目前本功能仅对正常登录用户开放，非高级会员在一个条件下会有最多只显示前 ${ADVANCE_LIMIT} 条数据的限制。
        \n整理不易，若觉得有用可以通过各种方式给与鼓励支持!`}
        renderRight={
          <>
            <Touchable
              style={_.mr.xs}
              onPress={() => {
                const { navigation } = this.props
                navigation.push('Hentai')
              }}
            >
              <Text size={11} type='sub' bold>
                前往旧版 ·
              </Text>
            </Touchable>
          </>
        }
      />
    )
  }

  render() {
    r(COMPONENT)

    const { $ } = this.props
    const { _loaded, layout, data } = $.state
    if (!_loaded && !data._loaded) {
      return (
        <>
          {this.renderFilter()}
          <Loading />
        </>
      )
    }

    const numColumns = $.isList ? undefined : this.num
    return (
      <PaginationList2
        key={`${layout}${numColumns}`}
        keyExtractor={keyExtractor}
        connectRef={this.connectRef}
        contentContainerStyle={_.container.page}
        numColumns={numColumns}
        data={$.list}
        limit={9}
        ListHeaderComponent={this.renderFilter()}
        renderItem={this.renderItem}
        onPage={$.onPage}
      />
    )
  }
}

export default ob(List)
