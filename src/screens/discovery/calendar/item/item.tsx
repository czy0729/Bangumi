/*
 * @Author: czy0729
 * @Date: 2019-03-22 09:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 14:12:11
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Text } from '@components'
import { Cover, Stars } from '@_'
import { _ } from '@stores'
import { HTMLDecode } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
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
    air,
    timeCN
  }) => {
    global.rerender('Calendar.Item.Main')

    const showScore = !hideScore && !!score

    let middle: any = []
    if (!!timeCN && timeCN !== '2359') {
      middle.push(`${timeCN.slice(0, 2)}:${timeCN.slice(2)}`)
    }
    if (collection) middle.push(collection)
    middle = middle.join(' · ')

    const onPress = () => {
      t('每日放送.跳转', {
        to: 'Subject',
        subjectId
      })

      navigation.push('Subject', {
        subjectId,
        _cn: name,
        _image: images.medium
      })
    }

    return (
      <View style={[styles.item, style]}>
        <Cover
          width={styles.cover.width}
          height={styles.cover.height}
          src={images.medium}
          radius
          shadow
          onPress={onPress}
        />
        <Touchable style={_.mt.sm} hitSlop={HIT_SLOP} withoutFeedback onPress={onPress}>
          <Text size={13} lineHeight={15} numberOfLines={2} bold>
            {HTMLDecode(name)}
          </Text>
          {!!middle && (
            <Text style={_.mt.xs} size={11} lineHeight={12} type='sub' bold>
              {middle}
            </Text>
          )}
          <Flex style={_.mt.sm}>
            {!!air && (
              <Text style={_.mr.xs} size={11} bold>
                第{air}话
              </Text>
            )}
            {showScore && <Stars value={score} simple />}
          </Flex>
        </Touchable>
      </View>
    )
  },
  DEFAULT_PROPS
)
