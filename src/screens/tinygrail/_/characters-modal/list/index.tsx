/*
 * @Author: czy0729
 * @Date: 2020-07-09 10:24:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 07:01:05
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { keyExtractor } from '@utils/app'
import { ob } from '@utils/decorators'
import { refreshControlProps } from '@tinygrail/styles'
import { styles } from './styles'

function List({ data, renderItem }) {
  if (!data) return null

  return (
    <PaginationList2
      style={styles.listView}
      keyExtractor={keyExtractor}
      refreshControlProps={refreshControlProps}
      data={data.list}
      showMesume={false}
      footerTextType='tinygrailText'
      footerEmptyDataText='没有符合的结果'
      renderItem={renderItem}
    />
  )
}

export default ob(List)
