/*
 * @Author: czy0729
 * @Date: 2019-10-03 15:43:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:09:28
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { Notice } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { r } from '@utils/dev'
import { Override, SubjectType } from '@types'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import Filter from '../filter'
import Item from '../item'
import { keyExtractor } from './utils'
import { COMPONENT } from './ds'

class List extends React.Component<
  Override<
    Ctx,
    {
      title: string
      id: SubjectType
    }
  >
> {
  static defaultProps = {
    title: '全部'
  }

  renderItem = ({ item, index }) => {
    return <Item type={this.id} index={index} {...item} />
  }

  onHeaderRefresh = () => {
    const { $ } = this.props
    return $.fetchList(this.id, true)
  }

  onFooterRefresh = () => {
    const { $ } = this.props
    return $.fetchList(this.id)
  }

  get id() {
    return this.props.id
  }

  render() {
    r(COMPONENT)

    const { $ } = this.props
    const list = $.list(this.id)
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
            scrollToTop={TABS[$.state.page].key === this.id}
            keyboardDismissMode='on-drag'
            ListHeaderComponent={
              $.state.rec && (
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

export default ob(List)
