/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-08 11:57:27
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { refreshControlProps } from '@tinygrail/styles'
import Item from './item'
import { tabs } from './ds'

function List({ id }, { $ }) {
  const { ico, _loaded } = $.myCharaAssets
  if (!_loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
  }

  const { page } = $.state
  const isMerge = id === 'merge'
  const isChara = id === 'chara'
  const isTemple = id === 'temple'
  let data
  if (isMerge) {
    data = $.mergeList
  } else if (isChara) {
    data = $.charaList
  } else if (isTemple) {
    data = $.temple
  } else {
    data = ico
  }

  const onHeaderRefresh = () => {
    if (isMerge) {
      $.fetchTemple()
      return $.fetchMyCharaAssets()
    }
    return isTemple ? $.fetchTemple() : $.fetchMyCharaAssets()
  }

  const numColumns = isTemple ? 3 : undefined
  return (
    <ListView
      key={`${_.orientation}${numColumns}`}
      style={_.container.flex}
      contentContainerStyle={_.container.bottom}
      keyExtractor={(item, index) => String(index)}
      refreshControlProps={refreshControlProps}
      footerTextType='tinygrailText'
      data={data}
      scrollToTop={id === tabs[page].key}
      numColumns={numColumns}
      windowSize={6}
      initialNumToRender={24}
      maxToRenderPerBatch={24}
      updateCellsBatchingPeriod={24}
      lazy={24}
      renderItem={({ item, index }) => <Item id={id} index={index} item={item} />}
      onHeaderRefresh={onHeaderRefresh}
    />
  )
}

export default obc(List)
