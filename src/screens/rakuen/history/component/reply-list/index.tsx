/*
 * @Author: czy0729
 * @Date: 2019-07-12 22:44:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-31 05:20:47
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Pagination, ScrollView } from '@components'
import { _, useStore } from '@stores'
import List from './list'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function ReplyList() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <>
      <ScrollView>
        {$.state.show && (
          <View
            style={[
              {
                minHeight: _.window.height
              },
              _.mt.sm
            ]}
          >
            <List />
          </View>
        )}
      </ScrollView>
      <Pagination
        style={_.mt.xs}
        input={$.state.ipt}
        onPrev={$.prev}
        onNext={$.next}
        onChange={$.onChange}
        onSearch={$.doSearch}
      />
    </>
  )
}

export default observer(ReplyList)
