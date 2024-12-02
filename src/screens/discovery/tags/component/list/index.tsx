/*
 * @Author: czy0729
 * @Date: 2019-10-03 15:43:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-02 17:02:34
 */
import React, { useCallback } from 'react'
import { ListView, Loading } from '@components'
import { Notice } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Filter from '../filter'
import Item from '../item'
import { keyExtractor } from './utils'
import { COMPONENT } from './ds'

function List({ id }) {
  const { $ } = useStore<Ctx>()
  const list = $.list(id)
  const numColumns = _.num(4)
  const handleHeaderRefresh = useCallback(() => $.fetchList(id, true), [$, id])
  const handleFooterRefresh = useCallback(() => $.fetchList(id), [$, id])
  const renderItem = useCallback(
    ({ item, index }) => <Item type={id} index={index} {...item} />,
    [id]
  )

  return (
    <>
      <Filter />
      {list._loaded ? (
        <ListView
          key={`${_.orientation}${numColumns}`}
          keyExtractor={keyExtractor}
          contentContainerStyle={_.container.bottom}
          data={list}
          numColumns={numColumns}
          keyboardDismissMode='on-drag'
          ListHeaderComponent={
            $.state.rec && (
              <Notice style={_.mb.md}>
                「排名」为作者整理的对应标签下评分最高的前 100
                个条目。若没有足够数据则跳转到正常的标签页面。
              </Notice>
            )
          }
          renderItem={renderItem}
          onHeaderRefresh={handleHeaderRefresh}
          onFooterRefresh={handleFooterRefresh}
        />
      ) : (
        <Loading />
      )}
    </>
  )
}

export default ob(List, COMPONENT)
