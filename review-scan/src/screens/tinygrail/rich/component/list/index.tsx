/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-02 21:01:57
 */
import React, { useCallback } from 'react'
import { toJS } from 'mobx'
import { ListView, Loading } from '@components'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { TINYGRAIL_LIST_PROPS } from '@tinygrail/styles'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import Item from '../item'
import { keyExtractor } from './utils'
import { COMPONENT } from './ds'

function List({ id, title = '全部' }) {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const [page, limit] = id.split('/')
    const handleRenderItem = useCallback(
      ({ item, index }) => (
        <Item index={index} title={title} page={parseInt(page)} limit={parseInt(limit)} {...item} />
      ),
      [limit, page]
    )
    const handleRefreshHeader = useCallback(() => $.fetchRich(id), [])

    const rich = $.rich(id)
    if (!rich._loaded) return <Loading style={_.container.flex} color={_.colorTinygrailText} />

    let data = rich
    if (title === TABS[1].title) {
      data = toJS(rich)
      data.list = data.list.slice().sort((a, b) => parseInt(b.share) - parseInt(a.share))
    } else if (title === TABS[2].title) {
      data = toJS(rich)
      data.list = data.list.slice().sort((a, b) => parseInt(b.total) - parseInt(a.total))
    }

    return (
      <ListView
        {...TINYGRAIL_LIST_PROPS}
        keyExtractor={keyExtractor}
        data={data}
        renderItem={handleRenderItem}
        onHeaderRefresh={handleRefreshHeader}
      />
    )
  })
}

export default List
