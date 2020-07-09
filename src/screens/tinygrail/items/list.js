/*
 * @Author: czy0729
 * @Date: 2020-07-09 10:24:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-09 10:26:58
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'

const refreshControlProps = {
  color: _.colorTinygrailText
}

function List({ data, renderItem }) {
  return (
    <ListView
      style={styles.listView}
      keyExtractor={keyExtractor}
      refreshControlProps={refreshControlProps}
      data={data}
      showMesume={false}
      footerTextType='tinygrailText'
      footerEmptyDataText='没有符合的结果'
      renderItem={renderItem}
    />
  )
}

export default observer(List)

const styles = StyleSheet.create({
  listView: {
    flex: 1,
    marginTop: _.sm
  }
})
