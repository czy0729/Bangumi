/*
 * @Author: czy0729
 * @Date: 2019-07-14 14:12:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:59:51
 */
import React, { useEffect } from 'react'
import { Header } from '@components'
import { TapListener } from '@_'
import { uiStore } from '@stores'
import { useIsFocused, useObserver } from '@utils/hooks'
import Page from './page'

const RakuenSetting = ({ navigation }) => {
  const isFocused = useIsFocused()
  useEffect(() => {
    if (!isFocused) uiStore.closePopableSubject()
  }, [isFocused])

  return useObserver(() => (
    <>
      <Header title='超展开设置' hm={['rakuen/settings', 'RakuenSetting']} />
      <TapListener>
        <Page navigation={navigation} />
      </TapListener>
    </>
  ))
}

export default RakuenSetting
