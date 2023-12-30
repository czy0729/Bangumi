/*
 * @Author: czy0729
 * @Date: 2019-04-14 20:26:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-29 19:53:19
 */
import React from 'react'
import { Flex, Button, Heatmap } from '@components'
import { Popover } from '@_'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { IOS, MODEL_SUBJECT_TYPE, SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../types'
import { memoStyles } from './styles'

const DATA = SUBJECT_TYPE.map(item => item.title)

function TabBarLeft(props, { $ }: Ctx) {
  rerender('User.TabBarLeft')

  const styles = memoStyles()
  const { subjectType } = $.state
  return (
    <Popover data={DATA} onSelect={$.onSelectSubjectType}>
      <Flex style={styles.tabBarLeft} justify='center'>
        <Button
          style={styles.btn}
          styleText={stl(styles.text, IOS && styles.textIOS)}
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
