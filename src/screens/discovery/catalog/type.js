/*
 * @Author: czy0729
 * @Date: 2020-01-05 20:45:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 20:36:11
 */
import React from 'react'
import { Touchable, Flex, Text, Iconfont, Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function Type({ $ }) {
  const { type } = $.state
  return (
    <Touchable onPress={$.toggleType}>
      <Flex>
        <Text>{type === 'collect' ? '热门' : '最新'}</Text>
        <Iconfont style={_.ml.xs} name='down' size={10} color={_.colorTitle} />
      </Flex>
      <Heatmap id='目录.切换类型' />
    </Touchable>
  )
}

export default ob(Type)
