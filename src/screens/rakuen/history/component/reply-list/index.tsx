/*
 * @Author: czy0729
 * @Date: 2019-07-12 22:44:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-05 21:11:31
 */
import React from 'react'
import { View } from 'react-native'
import { Pagination, ScrollView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import List from './list'
import { COMPONENT } from './ds'
import { styles } from './styles'

function ReplyList(props, { $ }: Ctx) {
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
        style={styles.pagination}
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
