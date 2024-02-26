/*
 * @Author: czy0729
 * @Date: 2019-04-14 20:26:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 11:42:19
 */
import React from 'react'
import { Button, Flex, Heatmap } from '@components'
import { Popover } from '@_'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { IOS, MODEL_SUBJECT_TYPE } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT, DS } from './ds'
import { memoStyles } from './styles'

function TabBarLeft(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { subjectType } = $.state
  return (
    <Popover data={DS} onSelect={$.onSelectSubjectType}>
      <Flex style={styles.tabBarLeft} justify='center'>
        <Button
          style={styles.btn}
          styleText={stl(styles.text, IOS && styles.textIOS)}
          type='ghostMain'
          size='sm'
        >
          {MODEL_SUBJECT_TYPE.getTitle(subjectType)}
        </Button>
      </Flex>
      <Heatmap id='我的.类型选择' />
    </Popover>
  )
}

export default obc(TabBarLeft, COMPONENT)
