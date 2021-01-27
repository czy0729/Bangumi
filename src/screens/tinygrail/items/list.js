/*
 * @Author: czy0729
 * @Date: 2020-07-09 10:24:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:17:25
 */
import React from 'react'
import { ListView } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
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

export default ob(List)

const styles = _.create({
  listView: {
    flex: 1,
    marginTop: _.sm
  }
})
