/*
 * @Author: czy0729
 * @Date: 2021-01-16 20:21:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-06 03:05:12
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

function IconEpFilter(props, { $ }: Ctx) {
  return (
    <View>
      {$.eps.length >= 160 && (
        <Popover style={styles.touch} data={$.filterEpsData} onSelect={$.updateFilterEps}>
          <Flex style={styles.btn} justify='center'>
            <Iconfont name='md-filter-list' color={$.state.filterEps ? _.colorMain : _.colorIcon} />
          </Flex>
        </Popover>
      )}
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
    width: 38,
    height: 38
  }
})
