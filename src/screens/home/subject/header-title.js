/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-13 14:52:01
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { FadeIn, Flex, Text } from '@components'
import { Cover, Stars } from '@screens/_'
import Stores, { _ } from '@stores'
import { urlStringify } from '@utils'
import { getCoverMedium } from '@utils/app'
import { CDN_OSS_SUBJECT } from '@constants/cdn'

const routeName = 'Subject'
const imgWidth = 24
const imgHeight = imgWidth * 1.28

function HeaderTitle({ navigation }) {
  const { state = {} } = navigation
  const { params = {} } = state
  const { subjectId } = params
  const screenKey = `${routeName}?${urlStringify({
    subjectId
  })}`
  const $ = Stores.get(screenKey)
  if (!$) {
    return null
  }

  const { showHeaderTitle } = $.state
  const { images } = $.subject
  const { score } = $.rating
  return (
    <FadeIn show={showHeaderTitle}>
      <Flex style={styles.container}>
        <Cover
          src={CDN_OSS_SUBJECT(getCoverMedium(images.common))}
          size={imgWidth}
          height={imgHeight}
          radius
          fadeDuration={0}
        />
        <Flex.Item style={_.ml.sm}>
          <Text size={13} numberOfLines={1}>
            {$.cn}
          </Text>
          <Stars value={score} />
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
