/*
 * @Author: czy0729
 * @Date: 2020-01-06 16:50:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-11 14:22:29
 */
import React from 'react'
import { Flex, Text, Heatmap } from '@components'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

function IconFavor({ $ }: Ctx) {
  const { collect } = $.catalogDetail
  return (
    <Flex style={collect ? styles.withCollect : _.mr.xs}>
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

export default obc(IconFavor)
