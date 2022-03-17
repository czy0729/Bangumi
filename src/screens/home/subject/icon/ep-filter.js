/*
 * @Author: czy0729
 * @Date: 2021-01-16 20:21:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-06-03 21:10:06
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function IconEpFilter(props, { $ }) {
  const { filterEps } = $.state
  const showFilter = $.eps.length >= 160 // 32 * 5 = 160
  return (
    <View>
      {showFilter && (
        <Popover
          style={styles.touch}
          data={$.filterEpsData}
          onSelect={$.updateFilterEps}
        >
          <Flex style={styles.btn} justify='center'>
            <Iconfont
              name='md-filter-list'
              color={filterEps ? _.colorMain : _.colorIcon}
            />
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
