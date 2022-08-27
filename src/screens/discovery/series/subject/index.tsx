/*
 * @Author: czy0729
 * @Date: 2022-04-20 13:52:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-28 00:35:05
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Loading } from '@components'
import { Cover, Rank, Stars, Tag } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IMG_WIDTH_SM, IMG_HEIGHT_SM, MODEL_COLLECTION_STATUS } from '@constants'
import { memoStyles } from './styles'
import { Ctx } from '../types'

function Subject({ style = undefined, id }, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const subject = $.subject(id)
  if (subject._loaded === 0) {
    return (
      <Flex style={styles.loading} justify='center'>
        <Loading.Raw />
      </Flex>
    )
  }

  const collection = $.collection(id)
  const eps = []
  if (collection?.ep) {
    eps.push(`看到 ${collection.ep} 话`)
  } else if (collection) {
    eps.push('未观看')
  }
  if (subject?.eps) eps.push(`总 ${subject?.eps} 话`)
  if (subject?.total_episodes && subject?.total_episodes !== subject?.eps)
    eps.push(`共 ${subject?.total_episodes} 章节`)

  const platform = subject.platform && subject.platform !== 'TV' && subject.platform
  return (
    <Flex style={[styles.item, style]} align='start'>
      <Cover
        src={subject.image}
        width={IMG_WIDTH_SM}
        height={IMG_HEIGHT_SM}
        radius
        onPress={() => {
          navigation.push('Subject', {
            subjectId: subject.id,
            _cn: subject.name,
            _image: subject.image
          })
        }}
      />
      <Flex.Item>
        <Flex style={styles.body} direction='column' justify='between' align='start'>
          <Text size={13} bold numberOfLines={2}>
            {subject.name}
          </Text>
          <Text size={11} bold>
            {eps.join(' / ')}
          </Text>
          <Flex style={_.mt.sm}>
            <Rank value={subject.rank} />
            <Stars style={_.mr.xs} value={subject.score} simple />
            {!!subject.date && (
              <Text size={11} type='sub'>
                {!!(subject.rank || subject.score) && ' / '}
                {subject.date}
              </Text>
            )}
            {!!platform && (
              <Text size={11} type='sub'>
                {!!(subject.rank || subject.score || subject.date) && ' / '}
                {platform}
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex.Item>
      <View style={styles.tagWrap}>
        <Tag
          style={styles.tag}
          value={MODEL_COLLECTION_STATUS.getLabel(String(collection?.type))}
          size={11}
        />
      </View>
    </Flex>
  )
}

export default obc(Subject)
