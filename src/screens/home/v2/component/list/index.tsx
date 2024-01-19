/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:13:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-19 19:51:54
 */
import React from 'react'
import { Loading } from '@components'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SETTING_HOME_LAYOUT } from '@constants'
import { SettingHomeLayout } from '@types'
import { Ctx, TabLabel } from '../../types'
import Grid from '../grid'
import List from './list'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function ListWrap({ title = '全部' as TabLabel }, { $ }: Ctx) {
  if (!$.collection._loaded) return <Loading />

  if (
    systemStore.setting.homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue<SettingHomeLayout>('网格')
  ) {
    return <Grid title={title} />
  }

  const showItem = $.showItem(title)
  if (!showItem) return null

  return (
    <List
      forwardRef={ref => {
        $.forwardRef(
          ref,
          $.tabs.findIndex(item => item.title === title)
        )
      }}
      styles={memoStyles()}
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

export default obc(ListWrap, COMPONENT)
