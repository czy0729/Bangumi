/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-14 16:45:00
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { FadeIn, Flex, Text } from '@components'
import { Cover } from '@screens/_'
import Stores, { _ } from '@stores'
import { urlStringify } from '@utils'

const routeName = 'Mono'
const imgWidth = 28

function HeaderTitle({ navigation }) {
  const { state = {} } = navigation
  const { params = {} } = state
  const { monoId } = params
  const screenKey = `${routeName}?${urlStringify({
    monoId
  })}`
  const $ = Stores.get(screenKey)
  if (!$) {
    return null
  }

  const { showHeaderTitle } = $.state
  return (
    <FadeIn show={showHeaderTitle}>
      <Flex style={styles.container}>
        {!!$.cover && (
          <Cover size={imgWidth} src={$.cover.replace('/m/', '/s/')} radius />
        )}
        <Flex.Item style={_.ml.sm}>
          <Text size={13} numberOfLines={1}>
            {$.jp}
          </Text>
          <Text type='sub' size={10} numberOfLines={1}>
            {$.cn}
          </Text>
        </Flex.Item>
      </Flex>
    </FadeIn>
  )
}

export default observer(HeaderTitle)

const styles = StyleSheet.create({
  container: {
    marginLeft: -_.md,
    marginRight: _.md
  }
})
