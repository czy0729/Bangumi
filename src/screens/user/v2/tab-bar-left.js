/*
 * @Author: czy0729
 * @Date: 2019-04-14 20:26:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-02-16 23:39:40
 */
import React from 'react'
import { Flex, Button, Heatmap } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import { H_RADIUS_LINE } from './store'

function TabBarLeft({ onSelect }, { $ }) {
  rerender('User.TabBarLeft')

  const styles = memoStyles()
  const { subjectType } = $.state
  return (
    <Popover data={MODEL_SUBJECT_TYPE.data.map(item => item.title)} onSelect={onSelect}>
      <Flex style={styles.tabBarLeft} justify='center'>
        <Button style={styles.btn} styleText={styles.text} type='ghostMain' size='sm'>
          {MODEL_SUBJECT_TYPE.getTitle(subjectType)}
        </Button>
      </Flex>
      <Heatmap id='我的.类型选择' />
    </Popover>
  )
}

export default obc(TabBarLeft)

const memoStyles = _.memoStyles(() => ({
  tabBarLeft: {
    zIndex: 10,
    paddingLeft: _._wind * _.ratio - 4,
    paddingRight: _.sm,
    marginTop: 13 - H_RADIUS_LINE,
    backgroundColor: _.select(
      'transparent',
      _.deepDark ? _._colorPlain : _._colorDarkModeLevel1
    ),
    borderTopLeftRadius: H_RADIUS_LINE,
    borderTopRightRadius: H_RADIUS_LINE,
    overflow: 'hidden'
  },
  btn: {
    width: 56 * _.ratio,
    height: 22 * _.ratio,
    marginTop: 3,
    borderRadius: 16 * _.ratio
  },
  text: {
    width: 56 * _.ratio
  }
}))
