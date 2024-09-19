/*
 * @Author: czy0729
 * @Date: 2021-01-16 20:21:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-20 00:47:26
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

function IconEpFilter(_props, { $ }: Ctx) {
  if (($.eps.length || 0) < 160) return null

  const { filterEps } = $.state
  return (
    <View>
      <Popover style={styles.touch} data={$.filterEpsData} onSelect={$.updateFilterEps}>
        <Flex style={styles.btn} justify='center'>
          <Iconfont name='md-filter-list' />
          {!!filterEps && (
            <Text style={styles.text} type='sub' size={12} bold>
              {filterEps}
            </Text>
          )}
        </Flex>
      </Popover>
      <Heatmap right={-6} bottom={18} id='条目.设置章节筛选' />
    </View>
  )
}

export default obc(IconEpFilter)

const styles = _.create({
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  btn: {
    minWidth: 38,
    height: 38
  },
  text: {
    marginRight: _.sm,
    marginLeft: _.xs
  }
})
