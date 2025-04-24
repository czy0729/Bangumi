/*
 * @Author: czy0729
 * @Date: 2024-03-10 04:02:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-24 20:09:37
 */
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-navigation'
import { useObserver } from 'mobx-react'
import { ListView, Loading } from '@components'
import { _, tinygrailStore } from '@stores'
import { keyExtractor } from '@utils'
import { TINYGRAIL_LIST_PROPS } from '@tinygrail/styles'
// import ItemsFilter from '../items-filter'
import Log from '../log'
import { styles } from './styles'
import { Props } from './types'

function List({ navigation, onToggle, onHeaderRefresh, onFooterRefresh }: Props) {
  // const [filter, setFilter] = useState('全部')

  const handleRenderItem = useCallback(
    ({ item }) => <Log navigation={navigation} {...item} onToggle={onToggle} />,
    [navigation, onToggle]
  )

  return useObserver(() => {
    if (!tinygrailStore.starLogs._loaded) return <Loading />

    return (
      <SafeAreaView style={_.container.flex}>
        {/* <ItemsFilter value={filter} onValueChange={setFilter} /> */}
        <ListView
          {...TINYGRAIL_LIST_PROPS}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.contentContainerStyle}
          data={tinygrailStore.starLogs}
          renderItem={handleRenderItem}
          onHeaderRefresh={onHeaderRefresh}
          onFooterRefresh={onFooterRefresh}
        />
      </SafeAreaView>
    )
  })
}

export default List
