/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-14 16:46:13
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { FadeIn, Flex, Text, Image } from '@components'
import Stores, { _ } from '@stores'
import { urlStringify } from '@utils'

const routeName = 'Group'
const imgWidth = 28

function HeaderTitle({ navigation }) {
  const { state = {} } = navigation
  const { params = {} } = state
  const { groupId } = params
  const screenKey = `${routeName}?${urlStringify({
    groupId
  })}`
  const $ = Stores.get(screenKey)
  if (!$) {
    return null
  }

  const { showHeaderTitle } = $.state
  const { title } = $.groupInfo
  return (
    <FadeIn show={showHeaderTitle}>
      <Flex style={styles.container}>
        {!!$.groupThumb && <Image size={imgWidth} src={$.groupThumb} radius />}
        <Flex.Item style={_.ml.sm}>
          <Text size={13} numberOfLines={1}>
            {title}
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
