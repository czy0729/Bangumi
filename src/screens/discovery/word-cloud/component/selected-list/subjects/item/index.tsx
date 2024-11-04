/*
 * @Author: czy0729
 * @Date: 2024-11-03 04:54:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 16:59:02
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, getCoverSrc, Image, Text, Touchable } from '@components'
import { Stars } from '@_'
import { _ } from '@stores'
import { getTimestamp, lastDate } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IMG_SUBJECT_ONLY, MODEL_SUBJECT_TYPE } from '@constants'
import { NUM_COLUMNS } from '../../ds'
import { Ctx } from '../../../../types'
import { memoStyles } from './styles'
import { Props } from './types'

function Item({ item, index }: Props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const width = Math.floor(_.window.contentWidth / (NUM_COLUMNS + 0.2 * NUM_COLUMNS))
  const ts = getTimestamp(item.time)
  let extraTitleText = lastDate(ts)
  if (extraTitleText.includes('年')) extraTitleText = lastDate(ts, false)
  return (
    <Flex
      style={{
        width: `${Math.floor(100 / NUM_COLUMNS)}%`
      }}
      justify='center'
      align='start'
    >
      <Touchable
        onPress={() => {
          navigation.push('Subject', {
            subjectId: item.id,
            _image: getCoverSrc(item.cover, width),
            _cn: item.name,
            _jp: item.name,
            _type: MODEL_SUBJECT_TYPE.getTitle($.state.subjectType)
          })

          t('词云.跳转', {
            to: 'Subject',
            subjectId: item.id
          })
        }}
      >
        <Flex
          style={[
            styles.item,
            {
              width
            }
          ]}
          direction='column'
        >
          <Flex
            style={{
              width
            }}
            justify='center'
          >
            <View style={styles.image}>
              <Image
                src={item.cover ? getCoverSrc(item.cover, width, false, true) : IMG_SUBJECT_ONLY}
                size={width}
                height={$.state.subjectType === 'music' ? width : Math.floor(width * 1.4)}
                radius={0}
                skeleton={false}
                placeholder={false}
                border={_.select('rgba(0, 0, 0, 0.08)', 'rgba(255, 255, 255, 0.16)')}
                priority={index < 10 ? 'high' : index < 24 ? 'normal' : 'low'}
              />
            </View>
          </Flex>
          <Text style={styles.title} size={12} bold numberOfLines={2} align='center'>
            {item.name}
          </Text>
          <Text style={styles.sub} type='sub' size={12} bold align='center'>
            {extraTitleText}
          </Text>
          {!!item.score && <Stars style={styles.stars} value={item.score} simple />}
        </Flex>
      </Touchable>
    </Flex>
  )
}

export default obc(Item)
