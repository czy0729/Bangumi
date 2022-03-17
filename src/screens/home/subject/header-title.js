/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-14 17:39:54
 */
import React from 'react'
import { Flex, Text } from '@components'
import { Cover, Stars } from '@_'
import { _ } from '@stores'
import { memo, ob } from '@utils/decorators'
import { getCoverMedium } from '@utils/app'
import { CDN_OSS_SUBJECT } from '@constants/cdn'

const imgWidth = 28
const imgHeight = imgWidth * 1.28
const defaultProps = {
  common: '',
  score: '',
  type: '',
  cn: '',
  titleLabel: ''
}

const HeaderTitle = memo(({ common, score, type, cn, titleLabel }) => {
  rerender('Subject.HeaderTitle.Main')

  return (
    <Flex style={styles.container}>
      <Cover
        src={CDN_OSS_SUBJECT(getCoverMedium(common))}
        size={type === '音乐' ? imgHeight : imgWidth}
        height={imgHeight}
        radius={_.radiusSm}
        fadeDuration={0}
      />
      <Flex.Item style={_.ml.sm}>
        <Text size={13} numberOfLines={1}>
          {cn}
          {!!titleLabel && (
            <Text size={13} type='sub'>
              {' '}
              · {titleLabel}
            </Text>
          )}
        </Text>
        <Stars value={score} />
      </Flex.Item>
    </Flex>
  )
}, defaultProps)

export default ob(({ $ }) => {
  rerender('Subject.HeaderTitle')
  return (
    <HeaderTitle
      common={$.subject.images?.common}
      score={$.rating.score}
      type={$.type}
      cn={$.cn}
      titleLabel={$.titleLabel}
    />
  )
})

const styles = _.create({
  container: {
    marginLeft: -_.sm,
    marginRight: _.lg
  }
})
