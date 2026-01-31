/*
 * @Author: czy0729
 * @Date: 2019-04-14 20:26:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-31 15:05:28
 */
import React from 'react'
import { Button, Flex, Heatmap } from '@components'
import { Popover } from '@_'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { MODEL_TIMELINE_SCOPE } from '@constants'
import { COMPONENT, DATA } from './ds'
import { memoStyles } from './styles'

import type { TimeLineScopeCn } from '@types'
import type { Ctx } from '../../../types'

function TabBarLeft() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <Popover data={DATA} onSelect={$.onSelectScope}>
        <Flex style={styles.tabBarLeft} justify='center'>
          <Button style={styles.btn} type='ghostMain' size='sm'>
            {MODEL_TIMELINE_SCOPE.getLabel<TimeLineScopeCn>($.state.scope)}
          </Button>
        </Flex>
        <Heatmap id='时间胶囊.切换类型' />
      </Popover>
    )
  })
}

export default TabBarLeft
