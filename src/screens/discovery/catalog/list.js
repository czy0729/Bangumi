/*
 * @Author: czy0729
 * @Date: 2022-01-09 11:09:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-09 11:13:55
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Heatmap } from '@components'
import { Pagination, ItemCatalog } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

const event = {
  id: '目录.跳转'
}
const heatmaps = {
  prev: '目录.上一页',
  next: '目录.下一页',
  search: '目录.页码跳转'
}

function List(props, { $ }) {
  const { show, ipt } = $.state
  return (
    <ScrollView contentContainerStyle={_.container.bottom} scrollToTop>
      {show && (
        <>
          <View style={styles.list}>
            {$.catalog.list.map((item, index) => (
              <ItemCatalog key={item.id} event={event} {...item}>
                {index === 1 && <Heatmap id='目录.跳转' />}
              </ItemCatalog>
            ))}
          </View>
          <Pagination
            style={_.mt.lg}
            input={ipt}
            heatmaps={heatmaps}
            onPrev={$.prev}
            onNext={$.next}
            onChange={$.onChange}
            onSearch={$.doSearch}
          />
        </>
      )}
    </ScrollView>
  )
}

export default obc(List)

const styles = _.create({
  list: {
    minHeight: _.window.height * 0.68
  }
})
