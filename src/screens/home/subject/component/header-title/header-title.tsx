/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-06 21:28:03
 */
import React from 'react'
import { View } from 'react-native'
import { Cover, Flex, Katakana, Text, Touchable } from '@components'
import { Rank, Stars } from '@_'
import { _ } from '@stores'
import { cnjp, x18 } from '@utils'
import { memo } from '@utils/decorators'
import { IOS } from '@constants'
import { COMPONENT_MAIN, DEFAULT_PROPS, IMAGE_HEIGHT, IMAGE_WIDTH } from './ds'
import { styles } from './styles'

const HeaderTitle = memo(
  ({ subjectId, common, rank, score, type, cn, jp, titleLabel, onScrollToTop }) => {
    const el = (
      <>
        <View style={styles.title}>
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
        </View>
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
      </>
    )

    return (
      <Flex style={styles.container}>
        <Cover
          src={common}
          size={type === '音乐' ? IMAGE_HEIGHT : IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          radius={_.radiusXs}
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
