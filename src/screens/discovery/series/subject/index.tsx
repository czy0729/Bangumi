/*
 * @Author: czy0729
 * @Date: 2022-04-20 13:52:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-11 01:54:03
 */
import React from 'react'
import { Flex, Text, Loading, Touchable } from '@components'
import { Cover, Rank, Stars, Manage } from '@_'
import { _, uiStore, collectionStore } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { IMG_WIDTH_SM, IMG_HEIGHT_SM, MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatusCn } from '@types'
import { memoStyles } from './styles'
import { Ctx } from '../types'

function Subject({ style = undefined, id, small = false }, { $, navigation }: Ctx) {
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
    eps.push(`看到 ${collection.ep} `)
  } else if (collection) {
    eps.push('看到 0')
  }
  if (subject?.eps) eps.push(` ${subject?.eps} 话`)
  if (subject?.total_episodes && subject?.total_episodes !== subject?.eps) {
    eps.push(`共 ${subject?.total_episodes} 章节`)
  }

  const platform = subject.platform && subject.platform !== 'TV' && subject.platform
  const bottom = [
    !!subject.total && `(${subject.total}人)`,
    subject.date || '未放送',
    platform
  ].filter(item => !!item)

  const { length } = subject.name
  const size = length > 24 ? 11 : length > 16 ? 12 : length > 8 ? 13 : 14

  return (
    <Touchable
      animate
      onPress={() => {
        navigation.push('Subject', {
          subjectId: subject.id,
          _cn: subject.name,
          _image: subject.image
        })
      }}
    >
      <Flex style={stl(styles.item, style)} align='start'>
        <Cover
          src={subject.image}
          width={small ? IMG_WIDTH_SM * 0.88 : IMG_WIDTH_SM}
          height={small ? IMG_HEIGHT_SM * 0.88 : IMG_HEIGHT_SM}
          radius
        />
        <Flex.Item>
          <Flex
            style={small ? styles.bodySm : styles.body}
            direction='column'
            justify='between'
            align='start'
          >
            <Text style={_.mr.sm} size={size} bold numberOfLines={2}>
              {subject.name}
            </Text>
            <Text size={11} bold>
              {eps.join(' / ')}
            </Text>
            <Flex style={_.mt.sm}>
              <Rank style={_.mr.xs} value={subject.rank} />
              <Stars style={_.mr.xs} value={subject.score} simple />
              <Text size={11} type='sub'>
                {bottom.join(' / ')}
              </Text>
            </Flex>
          </Flex>
        </Flex.Item>
        <Manage
          style={styles.manage}
          collection={
            collectionStore.collectionStatus(id) ||
            MODEL_COLLECTION_STATUS.getLabel<CollectionStatusCn>(
              String(collection?.type)
            ) ||
            ''
          }
          onPress={() => {
            uiStore.showManageModal(
              {
                subjectId: id,
                title: subject.name,
                status: collection?.type
              },
              '关联系列',
              () => {
                collectionStore.fetchCollectionStatusQueue([id])
              }
            )
          }}
        />
      </Flex>
    </Touchable>
  )
}

export default obc(Subject)
