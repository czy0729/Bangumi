/*
 * @Author: czy0729
 * @Date: 2021-01-17 01:32:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-26 23:38:03
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Iconfont, Text, Touchable } from '@components'
import { _, useStore } from '@stores'

import type { Ctx } from '../../types'

function IconPS() {
  const { $ } = useStore<Ctx>()

  if (!$.isPS || $.state.vndbScreenshots.length || $.state.dlsiteImages.length) return null

  return (
    <Touchable onPress={$.toPSNINE}>
      <Flex>
        <Text style={_.ml.xs} type='sub' lineHeight={22}>
          奖杯信息
        </Text>
        <Iconfont style={_.ml.xs} name='md-open-in-new' size={16} lineHeight={19} />
      </Flex>

      <Heatmap id='条目.查看奖杯' />
    </Touchable>
  )
}

export default observer(IconPS)
