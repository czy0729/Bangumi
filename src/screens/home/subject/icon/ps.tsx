/*
 * @Author: czy0729
 * @Date: 2021-01-17 01:32:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-06 03:08:36
 */
import React from 'react'
import { Touchable, Flex, Text, Iconfont, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function IconPS(props, { $ }: Ctx) {
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

export default obc(IconPS)
