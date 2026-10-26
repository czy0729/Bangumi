/*
 * @Author: czy0729
 * @Date: 2026-10-26 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-26 00:00:00
 *
 * 自定义 TabBar: 标签带数量角标
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, TabBar, Text } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { TabBarProps } from '@components'
import type { Ctx } from '../../types'
import type { Props, RenderLabel, TabRoute } from './types'

function TabBarView(props: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()
  const listLength = $.list.length
  const keysLength = $.keys.length

  const handleRenderLabel = useCallback<RenderLabel>(
    ({ route, focused }) => {
      const { title } = route
      let count: number
      if (title === '收藏') {
        count = listLength
      } else if (title === '缓存') {
        count = keysLength
      }

      return (
        <Flex style={_.container.block} justify='center'>
          <Text type='title' size={13} bold={focused} noWrap>
            {title}
          </Text>
          {!!count && (
            <Text type='sub' size={11} bold lineHeight={13} noWrap>
              {' '}
              {count}{' '}
            </Text>
          )}
        </Flex>
      )
    },
    [keysLength, listLength]
  )

  return (
    <TabBar
      {...(props as TabBarProps<TabRoute>)}
      style={styles.tabBar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
      indicatorStyle={styles.indicator}
      pressOpacity={1}
      pressColor='transparent'
      renderLabel={handleRenderLabel}
    />
  )
}

export default observer(TabBarView)
