/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:13:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-09 11:43:39
 */
import React from 'react'
import { Loading } from '@components'
import { obc } from '@utils/decorators'
import { MODEL_SETTING_HOME_LAYOUT } from '@constants'
import { SettingHomeLayout } from '@types'
import Grid from '../grid'
import { Ctx } from '../types'
import { TABS_WITH_GAME as TABS } from '../ds'
import List from './list'
import { memoStyles } from './styles'

export default obc(({ title = '全部' }, { $ }: Ctx) => {
  global.rerender('Home.List')

  if (!$.collection._loaded) return <Loading />

  const isGrid =
    $.homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue<SettingHomeLayout>('网格')
  if (isGrid) return <Grid title={title} />

  const styles = memoStyles()
  const { page, isFocused } = $.state
  const index = $.tabs.findIndex(item => item.title === title)
  return (
    <List
      connectRef={ref => $.connectRef(ref, index)}
      styles={styles}
      data={$.currentCollection(title)}
      title={title}
      scrollToTop={isFocused && TABS[page].title === title}
      showItem={$.showItem(title)}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={title === '游戏' ? $.onFooterRefresh : undefined}
    />
  )
})
