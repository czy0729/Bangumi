/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-05-27 10:22:57
 */
import React from 'react'
import { FadeIn, Flex, Text } from '@components'
import { Cover, Stars } from '@screens/_'
import Stores, { _ } from '@stores'
import { urlStringify } from '@utils'
import { ob } from '@utils/decorators'
import { getCoverMedium } from '@utils/app'
import { CDN_OSS_SUBJECT } from '@constants/cdn'

const routeName = 'Subject'
const imgWidth = 28
const imgHeight = imgWidth * 1.28

function HeaderTitle({ navigation }) {
  const { state = {} } = navigation
  const { params = {} } = state
  const { subjectId } = params
  const screenKey = `${routeName}?${urlStringify({
    subjectId
  })}`
  const $ = Stores.get(screenKey)
  if (!$) return null

  const { showHeaderTitle } = $.state
  const { images } = $.subject
  const { score } = $.rating
  return (
    <FadeIn show={showHeaderTitle}>
      <Flex style={styles.container}>
        <Cover
          src={CDN_OSS_SUBJECT(getCoverMedium(images.common))}
          size={$.type === '音乐' ? imgHeight : imgWidth}
          height={imgHeight}
          radius
          fadeDuration={0}
        />
        <Flex.Item style={_.ml.sm}>
          <Text size={13} numberOfLines={1}>
            {$.cn}
            {!!$.titleLabel && (
              <Text size={13} type='sub'>
                {' '}
                · {$.titleLabel}
              </Text>
            )}
          </Text>
          <Stars value={score} />
        </Flex.Item>
      </Flex>
    </FadeIn>
  )
}

export default ob(HeaderTitle)

const styles = _.create({
  container: {
    marginLeft: -_.md,
    marginRight: _.md
  }
})
