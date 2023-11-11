/*
 * @Author: czy0729
 * @Date: 2021-02-03 22:47:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-09 22:13:20
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Counts from './counts'
import Cate from './cate'
import List from './list'
import Store from './store'
import { styles } from './styles'
import { Ctx } from './types'

const Wiki = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-wiki'>
      <Header />
      <Page>
        <Counts />
        <View style={styles.list}>
          <Cate />
          <List />
        </View>
      </Page>
    </Component>
  ))
}

export default ic(Store, Wiki)
