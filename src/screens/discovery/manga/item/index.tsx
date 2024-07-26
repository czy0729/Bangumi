/*
 * @Author: czy0729
 * @Date: 2021-01-09 01:00:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-26 05:16:11
 */
import React from 'react'
import { Flex, Heatmap, Loading, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, Manage, Rank, Stars, Tag } from '@_'
import { _, collectionStore, otaStore, uiStore } from '@stores'
import { x18 } from '@utils'
import { obc } from '@utils/decorators'
import { withT } from '@utils/fetch'
import { IMG_DEFAULT, IMG_HEIGHT_LG, IMG_WIDTH_LG, MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatus } from '@types'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Item({ index, pickIndex }, { navigation }: Ctx) {
  const styles = memoStyles()
  const subjectId = otaStore.mangaSubjectId(pickIndex)
  const { id, mid, author, title, cates, ep, image, score, rank, total, status, publish } =
    otaStore.manga(subjectId)
  if (!id) {
    return (
      <Flex style={styles.loading} justify='center'>
        <Loading.Raw />
      </Flex>
    )
  }

  const size = title.length >= 20 ? 13 : title.length >= 14 ? 14 : 15
  const cover = image ? `https://lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT
  const _cates = String(cates).split(' ')
  const tipStr = [status, publish, author, ep].filter(item => !!item).join(' / ')
  const collection = collectionStore.collect(id)
  return (
    <Touchable
      style={styles.container}
      animate
      onPress={withT(
        () => {
          navigation.push('Subject', {
            subjectId: id,
            _cn: title,
            _image: getCoverSrc(cover, IMG_WIDTH_LG),
            _type: '书籍',
            _mid: mid
          })
        },
        'Manga.跳转',
        {
          subjectId: id
        }
      )}
    >
      <Flex style={styles.wrap} align='start'>
        <Cover src={cover} width={IMG_WIDTH_LG} height={IMG_HEIGHT_LG} radius cdn={!x18(id)} />
        <Flex.Item style={_.ml.wind}>
          <Flex align='start'>
            <Flex.Item>
              <Flex style={styles.content} direction='column' justify='between' align='start'>
                <Text size={size} bold numberOfLines={2}>
                  {title}
                </Text>
                <Text size={11} lineHeight={14}>
                  {tipStr}
                </Text>
              </Flex>
            </Flex.Item>
            <Manage
              subjectId={id}
              collection={collection}
              typeCn='书籍'
              onPress={() => {
                uiStore.showManageModal(
                  {
                    subjectId: id,
                    title,
                    status: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection),
                    action: '读'
                  },
                  '找漫画'
                )
              }}
            />
          </Flex>
          <Flex style={styles.bottom}>
            <Rank value={rank} />
            <Stars style={_.mr.xs} value={score} simple />
            {!!total && (
              <Text style={_.mr.sm} type='sub' size={11} bold>
                ({total})
              </Text>
            )}
            <Flex.Item>
              <Flex>
                {_cates.map(item => (
                  <Tag key={item} style={_.mr.sm} value={item} />
                ))}
              </Flex>
            </Flex.Item>
          </Flex>
        </Flex.Item>
      </Flex>
      {index === 0 && <Heatmap id='Manga.跳转' />}
    </Touchable>
  )
}

export default obc(Item)
