/*
 * @Author: czy0729
 * @Date: 2019-04-14 20:26:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-05 06:31:28
 */
import React from 'react'
import { Flex, Button, Heatmap } from '@components'
import { Popover } from '@_'
import { obc } from '@utils/decorators'
import { IOS, MODEL_SUBJECT_TYPE, SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function TabBarLeft({ onSelect }, { $ }: Ctx) {
  global.rerender('User.TabBarLeft')

  const styles = memoStyles()
  const { subjectType } = $.state
  return (
    <Popover data={SUBJECT_TYPE.map(item => item.title)} onSelect={onSelect}>
      <Flex style={styles.tabBarLeft} justify='center'>
        <Button
          style={styles.btn}
          styleText={[styles.text, IOS && styles.textIOS]}
          type='ghostMain'
          size='sm'
        >
          {MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subjectType)}
        </Button>
      </Flex>
      <Heatmap id='我的.类型选择' />
    </Popover>
  )
}

export default obc(TabBarLeft)
