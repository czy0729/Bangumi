/*
 * @Author: czy0729
 * @Date: 2024-03-05 03:12:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-08 07:08:26
 */
import React, { useMemo } from 'react'
import { r } from '@utils/dev'
import { useInsets, useObserver } from '@utils/hooks'
import TinygrailTabs from '@tinygrail/_/tabs-v2'
import { TABS } from '../../ds'
import ToolBar from '../tool-bar'
import { renderItem, renderLabel } from './utils'
import { COMPONENT } from './ds'

function Tabs() {
  r(COMPONENT)

  const { headerStyle } = useInsets()

  const elToolBar = useMemo(() => <ToolBar />, [])

  return useObserver(() => (
    <TinygrailTabs
      style={headerStyle}
      routes={TABS}
      renderContentHeaderComponent={elToolBar}
      renderItem={renderItem}
      renderLabel={renderLabel}
    />
  ))
}

export default Tabs
