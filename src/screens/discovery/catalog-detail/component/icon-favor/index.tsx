/*
 * @Author: czy0729
 * @Date: 2020-01-06 16:50:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-28 15:58:06
 */
import React from 'react'
import { Flex, Heatmap, Text } from '@components'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function IconFavor({ $ }: Ctx) {
  if (!($.detail.joinUrl || $.detail.byeUrl)) return null

  const { collect } = $.catalogDetail
  return (
    <Flex style={collect ? styles.withCollect : _.mr.sm}>
      <IconHeader
        name={$.isCollect ? 'md-star' : 'md-star-outline'}
        size={22}
        color={$.isCollect ? _.colorYellow : _.colorDesc}
        onPress={$.toggleCollect}
      >
        <Heatmap right={75} id='目录详情.取消收藏' />
        <Heatmap right={30} id='目录详情.收藏' />
      </IconHeader>
      {!!collect && (
        <Text style={styles.num} size={10} bold>
          {collect}
        </Text>
      )}
    </Flex>
  )
}

export default ob(IconFavor, COMPONENT)
