/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 06:54:16
 */
import React from 'react'
import { toJS } from 'mobx'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { refreshControlProps } from '@tinygrail/styles'
import Item from '../item'
import { TABS } from '../ds'
import { Ctx } from '../types'

function List({ id, title = '全部' }, { $ }: Ctx) {
  const rich = $.rich(id)
  if (!rich._loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
  }

  const [page, limit] = id.split('/')

  // top100 余额最多处理
  let data = rich
  if (title === '股息') {
    data = toJS(rich)
    data.list = data.list.sort((a, b) => parseInt(b.share) - parseInt(a.share))
  } else if (title === '余额') {
    data = toJS(rich)
    data.list = data.list.sort((a, b) => parseInt(b.total) - parseInt(a.total))
  } else if (title === '初始') {
    data = toJS(rich)
    data.list = data.list.sort((a, b) => parseInt(b.principal) - parseInt(a.principal))
  }
  return (
    <ListView
      style={_.container.flex}
      contentContainerStyle={_.container.bottom}
      keyExtractor={(item: any) => String(item?.userId)}
      refreshControlProps={refreshControlProps}
      footerTextType='tinygrailText'
      data={data}
      windowSize={6}
      initialNumToRender={24}
      maxToRenderPerBatch={24}
      updateCellsBatchingPeriod={24}
      lazy={24}
      scrollToTop={TABS[$.state.page].title === title}
      renderItem={({ item, index }) => (
        <Item
          index={index}
          title={title}
          page={parseInt(page)}
          limit={parseInt(limit)}
          {...item}
        />
      )}
      onHeaderRefresh={() => $.fetchRich(id)}
    />
  )
}

export default obc(List)
