/*
 * @Author: czy0729
 * @Date: 2022-09-07 00:07:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-07 08:43:24
 */
import React from 'react'
import { Page } from '@components'
import { useObserver } from '@utils/hooks'
import Header from './header'
import Chart from './chart'

const Sponsor = ({ navigation }) => {
  return useObserver(() => (
    <Page>
      <Header />
      <Chart navigation={navigation} />
    </Page>
  ))
}

export default Sponsor
