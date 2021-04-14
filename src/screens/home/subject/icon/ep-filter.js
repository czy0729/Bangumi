/*
 * @Author: czy0729
 * @Date: 2021-01-16 20:21:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-18 19:58:19
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, Iconfont } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function IconEpFilter(props, { $ }) {
  const { filterEps } = $.state
  const showFilter = $.eps.length >= 160 // 32 * 5 = 160
  return (
    <View>
      {showFilter && (
        <Popover data={$.filterEpsData} onSelect={$.updateFilterEps}>
          <Iconfont
            style={styles.icon}
            name='md-filter-list'
            color={filterEps ? _.colorMain : _.colorIcon}
          />
        </Popover>
      )}
      <Heatmap right={-6} bottom={18} id='条目.设置章节筛选' />
    </View>
  )
}

export default obc(IconEpFilter)

const styles = _.create({
  icon: {
    paddingHorizontal: _.sm
  }
})
