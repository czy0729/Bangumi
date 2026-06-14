/*
 * @Author: czy0729
 * @Date: 2024-12-28 06:16:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 13:01:29
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import ScrollView from '@tinygrail/_/scroll-view'
import Depth from '../depth'
import Form from '../form'
import Logs from '../logs'
import Records from '../records'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

/** 滚动内容区 */
function Scroll() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  const styles = memoStyles()

  return (
    <ScrollView contentContainerStyle={_.container.bottom} onRefresh={$.refresh}>
      <Flex style={styles.form} align='start'>
        <Flex.Item>
          <Form />
        </Flex.Item>
        <View style={styles.depth}>
          <Depth />
        </View>
      </Flex>
      <Logs />
      <Records />
    </ScrollView>
  )
}

export default observer(Scroll)
