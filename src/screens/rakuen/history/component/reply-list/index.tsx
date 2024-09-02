/*
 * @Author: czy0729
 * @Date: 2019-07-12 22:44:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 18:12:33
 */
import React from 'react'
import { View } from 'react-native'
import { Pagination, ScrollView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import List from './list'
import { COMPONENT } from './ds'

function ReplyList(_props, { $ }: Ctx) {
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

export default obc(ReplyList, COMPONENT)
