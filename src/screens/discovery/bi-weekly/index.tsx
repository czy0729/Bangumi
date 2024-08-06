/*
 * @Author: czy0729
 * @Date: 2024-05-14 04:14:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-14 06:23:36
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Component, Page } from '@components'
import List from './component/list'
import Header from './header'
import { useBiWeeklyPage } from './hooks'
import { Props } from './types'

/** Bangumi 半月刊 */
const BiWeekly = ({ navigation }: Props) => {
  const { loaded, data } = useBiWeeklyPage()
  return useObserver(() => (
    <Component id='screen-bi-weekly'>
      <Header navigation={navigation} />
      <Page loaded={loaded}>
        <List navigation={navigation} data={data} />
      </Page>
    </Component>
  ))
}

export default BiWeekly
