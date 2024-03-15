/*
 * @Author: czy0729
 * @Date: 2019-03-22 09:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 16:00:15
 */
import React from 'react'
import { View } from 'react-native'
import { Cover, Flex, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Stars } from '@_'
import { _ } from '@stores'
import { getType, HTMLDecode } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { COMPONENT_MAIN, DEFAULT_PROPS, HIT_SLOP } from './ds'

const ItemGrid = memo(
  ({ navigation, styles, hideScore, subjectId, name, image, score, collection, time }) => {
    const { width, height } = styles.cover
    const showScore = !hideScore && !!score

    let middle: any = []
    if (!!time && time !== '2359') {
      middle.push(`${time.slice(0, 2)}:${time.slice(2)}`)
    }
    middle = middle.join(' · ')

    return (
      <View style={styles.item}>
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
              _image: getCoverSrc(image, width)
            })
          }}
        >
          <Cover width={width} height={height} src={image} radius />
          <Text style={_.mt.sm} size={13} lineHeight={15} numberOfLines={2} bold>
            {!!collection && (
              <>
                <Text type={getType(collection)} size={13} lineHeight={15} bold>
                  {collection}
                </Text>
                <Text size={13} lineHeight={15} bold>
                  ·
                </Text>
              </>
            )}
            {HTMLDecode(name)}
          </Text>
          <Flex style={_.mt.xs}>
            {showScore && <Stars value={score} simple />}
            {!!middle && (
              <Text size={11} type='sub' bold noWrap>
                {showScore && score ? ' · ' : ''}
                {middle}
              </Text>
            )}
          </Flex>
        </Touchable>
      </View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default ItemGrid
