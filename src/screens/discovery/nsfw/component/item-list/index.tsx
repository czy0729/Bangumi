/*
 * @Author: czy0729
 * @Date: 2024-07-20 11:02:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-08 22:04:37
 */
import React from 'react'
import { Flex, Loading, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, Manage, Rank, Stars } from '@_'
import { _, collectionStore, otaStore, uiStore, userStore } from '@stores'
import { t } from '@utils/fetch'
import { useNavigation, useObserver } from '@utils/hooks'
import {
  IMG_DEFAULT,
  IMG_HEIGHT_LG,
  IMG_WIDTH_LG,
  MODEL_COLLECTION_STATUS,
  TEXT_ONLY
} from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { CollectionStatus } from '@types'
import type { Props } from './types'

function ItemList({ pickIndex }: Props) {
  const navigation = useNavigation(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    const subjectId = otaStore.nsfwSubjectId(pickIndex)
    const anime = otaStore.nsfw(subjectId)

    if (!anime?.id) {
      return (
        <Flex style={styles.loading} justify='center'>
          <Loading.Raw />
        </Flex>
      )
    }

    const { id, title, cover, score, total, rank, info, date, eps } = anime

    const titleLen = title.length
    const titleSize = titleLen >= 20 ? 13 : titleLen >= 14 ? 14 : 15
    const image = cover ? `https://lain.bgm.tv/pic/cover/m/${cover}.jpg` : IMG_DEFAULT

    const tip = [date, eps ? `${eps}话` : '', info].filter(Boolean).join(' / ')

    const collection = collectionStore.collect(id)
    const textOnly = TEXT_ONLY || !userStore.isLogin

    const handlePress = () => {
      navigation.push('Subject', {
        subjectId: id,
        _cn: title,
        _image: getCoverSrc(image, IMG_WIDTH_LG)
      })
      t('NSFW.跳转', { subjectId: id })
    }

    const handleManage = () => {
      uiStore.showManageModal(
        {
          subjectId: id,
          title,
          status: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection)
        },
        '找NSFW'
      )
    }

    return (
      <Touchable style={styles.container} animate onPress={handlePress}>
        <Flex style={styles.wrap} align='start'>
          <Cover
            src={image}
            width={IMG_WIDTH_LG}
            height={IMG_HEIGHT_LG}
            radius
            cdn={false}
            textOnly={textOnly}
          />

          <Flex.Item style={_.ml.wind}>
            <Flex style={styles.content} direction='column' justify='between' align='start'>
              <Flex align='start'>
                <Flex.Item>
                  <Text size={titleSize} bold numberOfLines={3}>
                    {title}
                  </Text>
                </Flex.Item>
                <Manage subjectId={id} collection={collection} onPress={handleManage} />
              </Flex>

              <Text style={styles.tip} size={11} lineHeight={14}>
                {tip}
              </Text>

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
  })
}

export default ItemList
