/*
 * @Author: czy0729
 * @Date: 2021-02-03 22:47:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-10 13:36:52
 */
import React from 'react'
import { View } from 'react-native'
import { Page } from '@components'
import { IconHoriz } from '@_'
import { _ } from '@stores'
import { runAfter } from '@utils'
import { injectWithHeader } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import Counts from './counts'
import Cate from './cate'
import List from './list'
import Store from './store'

const Wiki = (props, { $, navigation }) => {
  useMount(() => {
    runAfter(() => {
      $.setParams(navigation)
      $.init()
    })
  })

  return useObserver(() => (
    <Page>
      <Counts />
      <View style={styles.list}>
        <Cate />
        <List />
      </View>
    </Page>
  ))
}

export default injectWithHeader(Store, Wiki, {
  screen: '维基人',
  hm: ['wiki', 'Wiki'],
  defaultExtra: <IconHoriz />
})

const styles = _.create({
  list: {
    flex: 1,
    paddingTop: _.sm
  }
})
