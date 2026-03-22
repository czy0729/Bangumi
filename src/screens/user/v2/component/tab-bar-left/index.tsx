/*
 * @Author: czy0729
 * @Date: 2019-04-14 20:26:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:07:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Button, Flex, Heatmap } from '@components'
import { Popover } from '@_'
import { useStore } from '@stores'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { COMPONENT, DS } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function TabBarLeft() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()
  const { subjectType } = $.state

  return (
    <Popover data={DS} onSelect={$.onSelectSubjectType}>
      <Flex style={styles.tabBarLeft} justify='center'>
        <Button style={styles.btn} styleText={styles.text} type='ghostMain' size='sm'>
          {MODEL_SUBJECT_TYPE.getTitle(subjectType)}
        </Button>
      </Flex>
      <Heatmap id='我的.类型选择' />
    </Popover>
  )
}

export default observer(TabBarLeft)
