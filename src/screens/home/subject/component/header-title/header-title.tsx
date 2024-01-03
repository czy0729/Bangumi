/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 17:14:42
 */
import React from 'react'
import { Flex, Text } from '@components'
import { Cover, Stars } from '@_'
import { _ } from '@stores'
import { cnjp } from '@utils'
import { memo } from '@utils/decorators'
import { COMPONENT_MAIN, DEFAULT_PROPS, IMAGE_HEIGHT, IMAGE_WIDTH } from './ds'
import { styles } from './styles'

const HeaderTitle = memo(
  ({ common, score, type, cn, jp, titleLabel }) => {
    return (
      <Flex style={styles.container}>
        <Cover
          src={common}
          size={type === '音乐' ? IMAGE_HEIGHT : IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
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
            <Stars style={_.mt.xxs} value={score} />
          ) : (
            <Text style={_.mt.xxs} size={10} type='sub' numberOfLines={1}>
              {cnjp(jp, cn)}
            </Text>
          )}
        </Flex.Item>
      </Flex>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default HeaderTitle
