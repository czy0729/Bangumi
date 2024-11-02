/*
 * @Author: czy0729
 * @Date: 2024-11-03 04:54:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-03 06:41:28
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../../types'
import Item from './item'
import { memoStyles } from './styles'

const NUM_COLUMNS = _.isPad ? 5 : 4

function Subjects({ $, navigation }: Ctx) {
  const renderItem = useCallback(
    ({ item, index }) => <Item $={$} navigation={navigation} item={item} index={index} />,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <PaginationList2
        keyExtractor={keyExtractor}
        style={styles.container}
        contentContainerStyle={styles.container}
        data={$.selectedSubjects}
        limit={12}
        numColumns={NUM_COLUMNS}
        renderItem={renderItem}
        footerEmptyDataComponent={<View />}
        footerNoMoreDataComponent={<View />}
      />
    )
  })
}

export default Subjects
