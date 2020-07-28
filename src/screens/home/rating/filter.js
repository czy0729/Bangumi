/*
 * @Author: czy0729
 * @Date: 2020-07-28 22:28:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-28 22:46:05
 */
import React from 'react'
import { Touchable, Flex, Text, Iconfont } from '@components'
import { _ } from '@stores'
import { observer } from '@utils/decorators'

function Filter({ $ }) {
  const { isFriend } = $.state
  return (
    <Touchable onPress={$.toggleFilter}>
      <Flex>
        <Text size={13} type='sub'>
          {isFriend ? '好友' : '所有人'}{' '}
        </Text>
        <Iconfont size={13} name='down' color={_.colorSub} />
      </Flex>
    </Touchable>
  )
}

export default observer(Filter)
