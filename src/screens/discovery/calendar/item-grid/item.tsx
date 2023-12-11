/*
 * @Author: czy0729
 * @Date: 2019-03-22 09:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-09 15:42:29
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Cover, Text } from '@components'
import { Stars } from '@_'
import { _ } from '@stores'
import { HTMLDecode, stl } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { rerender } from '@utils/dev'
import { DEFAULT_PROPS, HIT_SLOP } from './ds'

export default memo(
  ({
    navigation,
    styles,
    hideScore,
    style,
    subjectId,
    name,
    images,
    score,
    collection,
    time
  }) => {
    rerender('Calendar.Item.Main')
    const { width, height } = styles.cover
    const showScore = !hideScore && !!score

    let middle: any = []
    if (!!time && time !== '2359') {
      middle.push(`${time.slice(0, 2)}:${time.slice(2)}`)
    }
    if (collection) middle.push(collection)
    middle = middle.join(' · ')

    return (
      <View style={stl(styles.item, style)}>
        <Touchable
          animate
          hitSlop={HIT_SLOP}
          onPress={() => {
            t('每日放送.跳转', {
              to: 'Subject',
              subjectId
            })

            navigation.push('Subject', {
              subjectId,
              _cn: name,
              _image: images?.medium
            })
          }}
        >
          <Cover width={width} height={height} src={images?.medium} radius />
          <Text style={_.mt.sm} size={13} lineHeight={15} numberOfLines={2} bold>
            {HTMLDecode(name)}
          </Text>
          <Flex style={_.mt.xs}>
            {showScore && <Stars value={score} simple />}
            {!!middle && (
              <Text size={11} type='sub' bold>
                {showScore && score ? ' · ' : ''}
                {middle}
              </Text>
            )}
          </Flex>
        </Touchable>
      </View>
    )
  },
  DEFAULT_PROPS
)
