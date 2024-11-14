/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:13:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-04 16:38:51
 */
import React from 'react'
import { Loading } from '@components'
import { _, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_SETTING_HOME_LAYOUT } from '@constants'
import { Ctx } from '../../types'
import Grid from '../grid/index.lazy'
import List from './list'
import { COMPONENT } from './ds'
import { Props } from './types'

function ListWrap({ title = '全部' }: Props) {
  if (systemStore.setting.homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue('网格')) {
    return <Grid title={title} />
  }

  const { $ } = useStore<Ctx>()
  if (!$.collection._loaded) return <Loading />

  const showItem = $.showItem(title)
  if (!showItem) return null

  return (
    <List
      forwardRef={ref => $.forwardRef(ref, title)}
      style={{
        paddingTop: $.listPaddingTop,
        paddingBottom: _.bottom
      }}
      data={$.currentCollection(title)}
      title={title}
      scrollToTop={$.scrollToTop(title)}
      showItem={showItem}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={title === '游戏' ? $.onFooterRefresh : undefined}
    />
  )
}

export default ob(ListWrap, COMPONENT)
