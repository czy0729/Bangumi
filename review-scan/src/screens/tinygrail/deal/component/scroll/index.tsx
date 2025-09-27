/*
 * @Author: czy0729
 * @Date: 2024-12-28 06:16:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-28 06:19:08
 */
import React from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import { Flex } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { refreshControlProps } from '@tinygrail/styles'
import Depth from '../depth'
import Form from '../form'
import Logs from '../logs'
import Records from '../records'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Scroll({ refreshing, onRefresh }) {
  const styles = memoStyles()
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          {...refreshControlProps}
          progressBackgroundColor={_.select(_.colorPlain, _._colorDarkModeLevel2)}
          colors={[_.colorMain]}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      {...SCROLL_VIEW_RESET_PROPS}
    >
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

export default ob(Scroll, COMPONENT)
