/*
 * @Author: czy0729
 * @Date: 2020-01-05 20:45:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-18 16:33:06
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Touchable, Flex, Text, Iconfont, Heatmap } from '@components'
import { _ } from '@stores'

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

export default observer(Type)
