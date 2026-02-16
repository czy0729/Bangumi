/*
 * @Author: czy0729
 * @Date: 2024-07-20 11:02:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 11:38:25
 */
import React from 'react'
import { Flex, Loading, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, Manage, Rank, Stars } from '@_'
import { _, collectionStore, otaStore, uiStore, userStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import {
  IMG_DEFAULT,
  IMG_HEIGHT_LG,
  IMG_WIDTH_LG,
  MODEL_COLLECTION_STATUS,
  TEXT_ONLY
} from '@constants'
import { CollectionStatus } from '@types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Item({ pickIndex }) {
  const navigation = useNavigation()
  const styles = memoStyles()
  const subjectId = otaStore.nsfwSubjectId(pickIndex)
  const { id, title, cover, score, total, rank, info, date, eps } = otaStore.nsfw(subjectId)
  if (!id) {
    return (
      <Flex style={styles.loading} justify='center'>
        <Loading.Raw />
      </Flex>
    )
  }

  const size = title.length >= 20 ? 13 : title.length >= 14 ? 14 : 15
  const image = cover ? `https://lain.bgm.tv/pic/cover/m/${cover}.jpg` : IMG_DEFAULT
  const tip = info || [date, eps ? `${eps}话` : ''].filter(item => !!item).join(' / ')
  const collection = collectionStore.collect(id)
  return (
    <Touchable
      style={styles.container}
      animate
      onPress={() => {
        navigation.push('Subject', {
          subjectId: id,
          _cn: title,
          _image: getCoverSrc(image, IMG_WIDTH_LG)
        })

        t('NSFW.跳转', {
          subjectId: id
        })
      }}
    >
      <Flex style={styles.wrap} align='start'>
        <Cover
          src={image}
          width={IMG_WIDTH_LG}
          height={IMG_HEIGHT_LG}
          radius
          cdn={false}
          textOnly={TEXT_ONLY || !userStore.isLogin}
        />
        <Flex.Item style={_.ml.wind}>
          <Flex style={styles.content} direction='column' justify='between' align='start'>
            <Flex align='start'>
              <Flex.Item>
                <Text size={size} bold numberOfLines={3}>
                  {title}
                </Text>
                <Text style={_.mt.sm} size={11} lineHeight={14}>
                  {tip}
                </Text>
              </Flex.Item>
              <Manage
                subjectId={id}
                collection={collection}
                onPress={() => {
                  uiStore.showManageModal(
                    {
                      subjectId: id,
                      title: title,
                      status: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection)
                    },
                    '找NSFW'
                  )
                }}
              />
            </Flex>
            <Flex style={_.mt.md} wrap='wrap'>
              <Rank value={rank} />
              <Stars style={_.mr.xs} value={score} simple />
              {!!total && (
                <Text type='sub' size={11} bold>
                  ({total})
                </Text>
              )}
            </Flex>
          </Flex>
        </Flex.Item>
      </Flex>
    </Touchable>
  )
}

export default ob(Item, COMPONENT)
