/*
 * @Author: czy0729
 * @Date: 2022-04-20 13:52:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:59:48
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Loading, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, Manage, Progress, Rank, Stars } from '@_'
import { _, collectionStore, uiStore, useStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { IMG_HEIGHT_SM, IMG_WIDTH_SM, MODEL_COLLECTION_STATUS } from '@constants'
import { SubjectId, ViewStyle } from '@types'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Subject({
  style,
  id,
  small = false
}: {
  style?: ViewStyle
  id: SubjectId
  small?: boolean
}) {
  const { $, navigation } = useStore<Ctx>()
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
    !!subject.total && `(${subject.total})`,
    String(subject.date).slice(0, 7) || '未放送',
    platform
  ].filter(item => !!item)

  const { length } = subject.name
  const size = length > 24 ? 11 : length > 16 ? 12 : length > 8 ? 13 : 14
  const width = small ? IMG_WIDTH_SM * 0.88 : IMG_WIDTH_SM

  const manageCollection =
    collectionStore.collect(id) || MODEL_COLLECTION_STATUS.getLabel(collection?.type) || ''
  const elText = (
    <Text style={_.mt.xs} size={11} lineHeight={1} bold numberOfLines={1} shadow>
      {eps.join(' / ')}
    </Text>
  )

  return (
    <Touchable
      animate
      onPress={() => {
        navigation.push('Subject', {
          subjectId: subject.id,
          _cn: subject.name,
          _image: getCoverSrc(subject.image, width)
        })
      }}
    >
      <Flex style={stl(styles.item, style)} align='start'>
        <Cover
          src={subject.image}
          width={width}
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
            <View style={_.container.block}>
              {manageCollection ? (
                <Progress current={collection?.ep || 0} total={subject?.eps || 0}>
                  {elText}
                </Progress>
              ) : (
                elText
              )}
            </View>
            <Flex style={_.mt.sm}>
              <Rank style={_.mr.xs} value={subject.rank} />
              <Stars style={_.mr.xs} value={subject.score} simple />
              <Text size={11} type='sub'>
                {bottom.join(' · ')}
              </Text>
            </Flex>
          </Flex>
        </Flex.Item>
        <Manage
          style={styles.manage}
          subjectId={id}
          collection={manageCollection}
          onPress={() => {
            uiStore.showManageModal(
              {
                subjectId: id,
                title: subject.name,
                status: collection?.type
              },
              '关联系列'
            )
          }}
        />
      </Flex>
    </Touchable>
  )
}

export default ob(Subject, COMPONENT)
