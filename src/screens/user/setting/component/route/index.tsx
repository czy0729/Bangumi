/*
 * @Author: czy0729
 * @Date: 2022-01-22 11:55:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-05 22:20:01
 */
import { observer } from 'mobx-react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import { WEB } from '@constants'
import { getShows } from '../../utils'
import { IconPanelBottom } from '../icons'
import BottomTabLazy from './bottom-tab-lazy'
import HomeRenderTabs from './home-render-tabs'
import InitialPage from './initial-page'
import KeepDistance from './keep-distance'
import { COMPONENT, TEXTS } from './ds'

import type { WithFilterProps } from '../../types'

/** 页面导航 */
function Route({ filter }: WithFilterProps) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  if (WEB || !shows) return null

  return (
    <>
      <ItemSetting
        icon={<IconPanelBottom />}
        hd='页面导航'
        arrow
        highlight
        filter={filter}
        onPress={setTrue}
      />
      <ActionSheet show={state} title='页面导航' height={680} onClose={setFalse}>
        {shows.blocks && <HomeRenderTabs filter={filter} />}
        {shows.initialPage && <InitialPage filter={filter} />}
        {shows.bottomTabLazy && <BottomTabLazy filter={filter} />}
        {shows.keepDistance && <KeepDistance filter={filter} />}
      </ActionSheet>
    </>
  )
}

export default observer(Route)
