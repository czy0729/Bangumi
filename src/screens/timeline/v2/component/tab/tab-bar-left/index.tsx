/*
 * @Author: czy0729
 * @Date: 2019-04-14 20:26:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 20:37:28
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Button, Flex, Heatmap } from '@components'
import { Popover } from '@_'
import { useStore } from '@stores'
import { MODEL_TIMELINE_SCOPE } from '@constants'
import { COMPONENT, DATA } from './ds'
import { styles } from './styles'

import type { TimeLineScopeCn } from '@types'
import type { Ctx } from '../../../types'

function TabBarLeft() {
  const { $ } = useStore<Ctx>(COMPONENT)

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
}

export default observer(TabBarLeft)
