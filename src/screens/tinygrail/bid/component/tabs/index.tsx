/*
 * @Author: czy0729
 * @Date: 2025-01-16 17:19:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-08 07:00:12
 */
import React, { useCallback, useMemo } from 'react'
import { Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import TabsComp from '@tinygrail/_/tabs-v2'
import { TABS } from '../../ds'
import ToolBar from '../tool-bar'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Tabs() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elToolBar = useMemo(() => <ToolBar />, [])

  return useObserver(() => {
    const handleRenderLabel = useCallback(({ route, focused }) => {
      const getCount = (route: { key: string }) => {
        switch (route.key) {
          case 'bid':
          case 'asks':
            return $.list(route.key)?.list?.length || 0

          case 'auction':
            return $.list(route.key)?.list.filter(item => item.state === 0).length || 0

          default:
            return 0
        }
      }

      return (
        <Flex style={_.container.block} justify='center'>
          <Text type='tinygrailPlain' size={13} bold={focused}>
            {route.title}
          </Text>
          {!!getCount(route) && (
            <Text type='tinygrailText' size={11} bold lineHeight={13}>
              {' '}
              {getCount(route)}{' '}
            </Text>
          )}
        </Flex>
      )
    }, [])

    return (
      <TabsComp
        routes={TABS}
        renderContentHeaderComponent={elToolBar}
        renderItem={renderItem}
        renderLabel={handleRenderLabel}
      />
    )
  })
}

export default Tabs
