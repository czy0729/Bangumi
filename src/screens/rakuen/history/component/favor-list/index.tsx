/*
 * @Author: czy0729
 * @Date: 2022-11-27 15:32:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-25 00:00:00
 */
import { observer } from 'mobx-react'
import { SegmentedControl } from '@components'
import { PaginationList } from '@_'
import { _, useStore } from '@stores'
import { DS } from '../../ds'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function FavorList() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const { _loaded, type } = $.state
  if (!_loaded) return null

  return (
    <>
      <SegmentedControl
        style={styles.segment}
        size={11}
        values={DS}
        selectedIndex={DS.findIndex(item => item === type)}
        onValueChange={$.onValueChange}
      />
      <PaginationList
        keyExtractor={keyExtractor}
        contentContainerStyle={_.container.bottom}
        data={$.list}
        limit={12}
        skipEnteringExitingAnimations={12}
        renderItem={renderItem}
        onPage={$.onPage}
      />
    </>
  )
}

export default observer(FavorList)
