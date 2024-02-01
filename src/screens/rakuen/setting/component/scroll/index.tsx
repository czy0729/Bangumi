/*
 * @Author: czy0729
 * @Date: 2022-03-15 23:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-31 20:40:01
 */
import React, { useCallback } from 'react'
import { useObserver } from 'mobx-react'
import { Page, ScrollView } from '@components'
import { _, uiStore } from '@stores'
import { r } from '@utils/dev'
import { Navigation } from '@types'
import Base from '../base'
import Blockeds from '../blockeds'
import Likes from '../likes'
import Media from '../media'
import Slider from '../slider'
import Topic from '../topic'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Scroll({ navigation }: { navigation: Navigation }) {
  r(COMPONENT)

  const onScroll = useCallback(() => {
    uiStore.closePopableSubject()
  }, [])

  return useObserver(() => (
    <Page style={_.select(_.container.bg, _.container.plain)}>
      <ScrollView contentContainerStyle={styles.container} onScroll={onScroll}>
        <Blockeds navigation={navigation} />
        <Likes />
        <Topic />
        <Slider />
        <Media />
        <Base />
      </ScrollView>
    </Page>
  ))
}

export default Scroll
