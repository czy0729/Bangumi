/*
 * @Author: czy0729
 * @Date: 2019-04-14 20:26:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 20:35:01
 */
import React from 'react'
import { Flex, Button, Heatmap } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

function TabBarLeft({ onSelect }, { $ }) {
  const styles = memoStyles()
  const { subjectType } = $.state
  return (
    <Popover
      data={MODEL_SUBJECT_TYPE.data.map(item => item.title)}
      onSelect={onSelect}
    >
      <Flex style={styles.tabBarLeft} justify='center'>
        <Button style={styles.btn} type='ghostMain' size='sm'>
          {MODEL_SUBJECT_TYPE.getTitle(subjectType)}
        </Button>
      </Flex>
      <Heatmap id='我的.类型选择' />
    </Popover>
  )
}

export default obc(TabBarLeft)

const memoStyles = _.memoStyles(_ => ({
  tabBarLeft: {
    height: 42,
    paddingLeft: _._wind,
    paddingRight: _.sm,
    backgroundColor: _.select('transparent', _._colorDarkModeLevel1)
  },
  btn: {
    width: 48,
    height: 24,
    borderRadius: 16
  }
}))
