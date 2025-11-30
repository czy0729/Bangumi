/*
 * @Author: czy0729
 * @Date: 2022-03-15 23:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-25 15:34:16
 */
import React, { useCallback } from 'react'
import { Page, ScrollView } from '@components'
import { _, uiStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import Base from '../base'
import Blockeds from '../blockeds'
import Likes from '../likes'
import Media from '../media'
import Slider from '../slider'
import Topic from '../topic'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { WithNavigation } from '@types'

function Scroll({ navigation }: WithNavigation) {
  r(COMPONENT)

  const handleScroll = useCallback(() => {
    uiStore.closePopableSubject()
  }, [])

  return useObserver(() => (
    <Page style={_.select(_.container.bg, _.container.plain)}>
      <ScrollView contentContainerStyle={styles.container} onScroll={handleScroll}>
        <Likes />
        <Topic />
        <Slider />
        <Media />
        <Base />
        <Blockeds navigation={navigation} />
      </ScrollView>
    </Page>
  ))
}

export default Scroll
