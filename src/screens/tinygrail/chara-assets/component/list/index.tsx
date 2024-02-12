/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-12 18:39:03
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { TINYGRAIL_LIST_PROPS } from '@tinygrail/_/ds'
import { ListEmpty } from '@types'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import Item from '../item'
import { keyExtractor } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

function List({ id }, { $ }: Ctx) {
  if (!$.myCharaAssets._loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
  }

  const isMerge = id === 'merge'
  const isChara = id === 'chara'
  const isTemple = id === 'temple'

  let data: ListEmpty
  if (isMerge) {
    data = $.mergeList
  } else if (isChara) {
    data = $.charaList
  } else if (isTemple) {
    data = $.temple
  } else {
    data = $.myCharaAssets.ico
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
      {...TINYGRAIL_LIST_PROPS}
      key={`${_.orientation}${numColumns}`}
      keyExtractor={keyExtractor}
      style={_.container.flex}
      contentContainerStyle={isTemple ? styles.temple : styles.list}
      data={data}
      numColumns={numColumns}
      scrollToTop={id === TABS[$.state.page].key}
      renderItem={({ item, index }) => <Item id={id} index={index} item={item} />}
      onHeaderRefresh={onHeaderRefresh}
    />
  )
}

export default obc(List, COMPONENT)
