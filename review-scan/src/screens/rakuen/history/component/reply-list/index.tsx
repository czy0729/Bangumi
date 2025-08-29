/*
 * @Author: czy0729
 * @Date: 2019-07-12 22:44:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 16:24:30
 */
import React from 'react'
import { View } from 'react-native'
import { Pagination, ScrollView } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import List from './list'
import { COMPONENT } from './ds'

function ReplyList() {
  const { $ } = useStore<Ctx>()
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

export default ob(ReplyList, COMPONENT)
