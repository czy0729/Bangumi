/*
 * @Author: czy0729
 * @Date: 2019-10-03 15:43:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-04 16:08:00
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { Notice } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { SubjectType } from '@types'
import Filter from '../filter'
import Item from '../item'
import { TABS } from '../ds'
import { Ctx } from '../types'

class List extends React.Component<{
  title: string
  id: SubjectType
}> {
  static defaultProps = {
    title: '全部'
  }

  renderItem = ({ item, index }) => {
    const { id } = this.props
    return <Item type={id} index={index} {...item} />
  }

  onHeaderRefresh = () => {
    const { $ } = this.context as Ctx
    const { id } = this.props
    return $.fetchList(id, true)
  }

  onFooterRefresh = () => {
    const { $ } = this.context as Ctx
    const { id } = this.props
    return $.fetchList(id)
  }

  render() {
    const { $ } = this.context as Ctx
    const { id } = this.props
    const { page, rec } = $.state
    const list = $.list(id)
    const numColumns = _.num(4)
    return (
      <>
        <Filter />
        {list._loaded ? (
          <ListView
            key={`${_.orientation}${numColumns}`}
            keyExtractor={keyExtractor}
            contentContainerStyle={_.container.bottom}
            data={list}
            lazy={32}
            numColumns={numColumns}
            scrollToTop={TABS[page].key === id}
            keyboardDismissMode='on-drag'
            ListHeaderComponent={
              rec && (
                <Notice style={_.mb.md}>
                  「排名」为作者整理的对应标签下评分最高的前 100
                  个条目。若没有足够数据则跳转到正常的标签页面。
                </Notice>
              )
            }
            renderItem={this.renderItem}
            onHeaderRefresh={this.onHeaderRefresh}
            onFooterRefresh={this.onFooterRefresh}
          />
        ) : (
          <Loading />
        )}
      </>
    )
  }
}

export default obc(List)

function keyExtractor(item: { name: any; nums: any }) {
  return `${item.name}|${item.nums}`
}
