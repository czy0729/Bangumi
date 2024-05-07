/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 01:52:08
 */
import React from 'react'
import { Cover, Flex, Katakana, Text } from '@components'
import { Rank, Stars } from '@_'
import { _ } from '@stores'
import { cnjp } from '@utils'
import { memo } from '@utils/decorators'
import { COMPONENT_MAIN, DEFAULT_PROPS, IMAGE_HEIGHT, IMAGE_WIDTH } from './ds'
import { styles } from './styles'

const HeaderTitle = memo(
  ({ common, rank, score, type, cn, jp, titleLabel }) => {
    return (
      <Flex style={styles.container}>
        <Cover
          src={common}
          size={type === '音乐' ? IMAGE_HEIGHT : IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          radius={_.radiusXs}
          fadeDuration={0}
        />
        <Flex.Item style={_.ml.sm}>
          <Katakana.Provider style={styles.itemStyle} size={12} numberOfLines={1}>
            <Katakana size={12} numberOfLines={1}>
              {cnjp(cn, jp)}
              {!!titleLabel && (
                <Text size={12} type='sub'>
                  {' '}
                  · {titleLabel}
                </Text>
              )}
            </Katakana>
          </Katakana.Provider>
          {score ? (
            <Flex style={_.mt.xxs}>
              <Rank style={_.mr.xs} value={rank} size={9} />
              <Stars value={score} />
            </Flex>
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
