/*
 * @Author: czy0729
 * @Date: 2019-11-27 21:50:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-21 15:12:51
 */
import { useCallback, useState } from 'react'
import { observer } from 'mobx-react'
import { _, systemStore, userStore } from '@stores'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { USERS_MAP } from '../../ds'
import { useTreemapSquarify } from '../../hooks'
import FilterBar from './filter-bar'
import Treemap from './treemap'
import { COMPONENT } from './ds'

import type { LayoutChangeEvent } from 'react-native'

/** 支持额加权 treemap 图表 */
function Chart() {
  const navigation = useNavigation(COMPONENT)

  /** 容器尺寸只有布局后才知道, 未测量前不排布 */
  const [frame, setFrame] = useState({
    width: 0,
    height: 0
  })

  const {
    data,
    filterLength,
    hiddenCount,
    myIndex,
    myData,
    handleFilter,
    handleBatchFilter,
    handleLocate,
    handleResetFilter
  } = useTreemapSquarify(
    frame.width,
    frame.height,
    String(userStore.myUserId || ''),
    String(userStore.myId || '')
  )

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setFrame(prev => (prev.width === width && prev.height === height ? prev : { width, height }))
  }, [])

  /** 长按进入空间只对支持者开放 */
  const handleLongPress = useCallback(
    (id: string) => {
      navigation.push('Zone', {
        userId: id,
        _name: USERS_MAP[id]?.n
      })

      t('赞助者.跳转', {
        userId: id
      })
    },
    [navigation]
  )

  return (
    <>
      <FilterBar
        filterLength={filterLength}
        hiddenCount={hiddenCount}
        myIndex={myIndex}
        onBatchFilter={handleBatchFilter}
        onLocate={handleLocate}
        onReset={handleResetFilter}
      />
      <Treemap
        data={data}
        measured={!!frame.height}
        isDark={_.isDark}
        myData={myData}
        onLayout={handleLayout}
        onPress={handleFilter}
        onLongPress={systemStore.advance ? handleLongPress : undefined}
        onReset={handleResetFilter}
      />
    </>
  )
}

export default observer(Chart)
