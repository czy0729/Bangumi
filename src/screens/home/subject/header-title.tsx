/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-23 02:28:21
 */
import React from 'react'
import { Flex, Text } from '@components'
import { Cover, Stars } from '@_'
import { cnjp } from '@utils'
import { _ } from '@stores'
import { memo, ob } from '@utils/decorators'

const imgWidth = 28
const imgHeight = imgWidth * 1.28
const defaultProps = {
  common: '',
  score: '',
  type: '',
  cn: '',
  jp: '',
  titleLabel: ''
}

const HeaderTitle = memo(({ common, score, type, cn, jp, titleLabel }) => {
  global.rerender('Subject.HeaderTitle.Main')

  return (
    <Flex style={styles.container}>
      <Cover
        src={common}
        size={type === '音乐' ? imgHeight : imgWidth}
        height={imgHeight}
        radius={_.radiusSm}
        fadeDuration={0}
      />
      <Flex.Item style={_.ml.sm}>
        <Text size={13} numberOfLines={1}>
          {cnjp(cn, jp)}
          {!!titleLabel && (
            <Text size={13} type='sub'>
              {' '}
              · {titleLabel}
            </Text>
          )}
        </Text>
        {score ? (
          <Stars value={score} />
        ) : (
          <Text style={_.mt.xxs} size={10} type='sub' numberOfLines={1}>
            {cnjp(jp, cn)}
          </Text>
        )}
      </Flex.Item>
    </Flex>
  )
}, defaultProps)

export default ob(({ $ }) => {
  global.rerender('Subject.HeaderTitle')

  return (
    <HeaderTitle
      common={$.subject.images?.common}
      score={$.rating.score}
      type={$.type}
      cn={$.cn}
      jp={$.jp}
      titleLabel={$.titleLabel}
    />
  )
})

const styles = _.create({
  container: {
    marginLeft: -_.sm,
    marginRight: _.lg,
    marginBottom: _.ios(-4, 0)
  }
})
