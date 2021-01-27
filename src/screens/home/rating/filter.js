/*
 * @Author: czy0729
 * @Date: 2020-07-28 22:28:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 20:54:59
 */
import React from 'react'
import { Touchable, Flex, Text, Iconfont, Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

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
      <Heatmap id='用户评分.切换类型' />
    </Touchable>
  )
}

export default ob(Filter)
