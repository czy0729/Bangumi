/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-05 22:10:46
 */
import React from 'react'
import { View } from 'react-native'
import { Cover, Flex, Katakana, Text, Touchable } from '@components'
import { Rank, Stars } from '@_'
import { _, systemStore } from '@stores'
import { cnjp, getVisualLength, x18 } from '@utils'
import { memo } from '@utils/decorators'
import { FROZEN_FN, IOS } from '@constants'
import { COMPONENT_MAIN, DEFAULT_PROPS, IMAGE_HEIGHT, IMAGE_WIDTH } from './ds'
import { styles } from './styles'

import type { TextProps } from '@components'

const HeaderTitle = memo(
  ({
    subjectId = 0,
    common = '',
    rank = '',
    score = '',
    type = '',
    cn = '',
    jp = '',
    titleLabel = '',
    onScrollToTop = FROZEN_FN
  }) => {
    const top = cnjp(cn, jp)
    const visualLength = getVisualLength(`${top}${titleLabel ? ` · ${titleLabel}` : ''}`)
    const textProps: TextProps = {
      size: visualLength >= 13 ? 11 : 12,
      lineHeight: 12,
      numberOfLines: 1
    } as const

    const el = (
      <>
        <View style={styles.title}>
          <Katakana.Provider style={styles.itemStyle} {...textProps}>
            <Katakana {...textProps}>
              {top}
              {!!titleLabel && (
                <Text {...textProps} type='sub'>
                  {' '}
                  · {titleLabel}
                </Text>
              )}
            </Katakana>
          </Katakana.Provider>
        </View>
        {!systemStore.setting.hideScore && score ? (
          <Flex style={_.mt.xs}>
            <Rank style={_.mr.xs} value={rank} size={9} />
            <Stars value={score} />
          </Flex>
        ) : (
          <Text style={_.mt.xs} type='sub' size={10} numberOfLines={1}>
            {cnjp(jp, cn)}
          </Text>
        )}
      </>
    )

    return (
      <Flex style={styles.container}>
        <Cover
          key={String(common)}
          src={common}
          size={type === '音乐' ? IMAGE_HEIGHT : IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          radius={4}
          cdn={!x18(subjectId)}
          fadeDuration={0}
        />
        <Flex.Item style={_.ml.sm}>
          {IOS ? (
            el
          ) : (
            <Touchable withoutFeedback onPress={onScrollToTop}>
              {el}
            </Touchable>
          )}
        </Flex.Item>
      </Flex>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default HeaderTitle
