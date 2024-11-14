/*
 * @Author: czy0729
 * @Date: 2021-01-17 01:32:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:55:00
 */
import React from 'react'
import { Flex, Heatmap, Iconfont, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'

function IconPS() {
  const { $ } = useStore<Ctx>()
  if (!$.isPS) return null

  return (
    <Touchable style={_.mr._sm} onPress={$.toPSNINE}>
      <Flex>
        <Text style={_.ml.xs} size={13} type='sub'>
          奖杯
        </Text>
        <Iconfont style={_.ml.xs} name='md-open-in-new' size={17} />
      </Flex>
      <Heatmap id='条目.查看奖杯' />
    </Touchable>
  )
}

export default ob(IconPS)
