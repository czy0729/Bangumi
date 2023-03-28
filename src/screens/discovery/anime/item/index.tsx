/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 14:56:52
 */
import React from 'react'
import { Flex, Text, Touchable, Heatmap, Loading } from '@components'
import { _, otaStore, collectionStore, uiStore } from '@stores'
import { Tags, Cover, Stars, Rank, Manage } from '@_'
import { cnjp } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import {
  IMG_WIDTH_LG,
  IMG_HEIGHT_LG,
  IMG_DEFAULT,
  MODEL_COLLECTION_STATUS
} from '@constants'
import { CollectionStatus } from '@types'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Item({ index, pickIndex }, { navigation }: Ctx) {
  const styles = memoStyles()
  const subjectId = otaStore.animeSubjectId(pickIndex)
  const {
    id,
    ageId,
    image,
    cn,
    jp,
    ep,
    type,
    status,
    begin,
    tags,
    official,
    score,
    rank,
    total
  } = otaStore.anime(subjectId)
  if (!id) {
    return (
      <Flex style={styles.loading} justify='center'>
        <Loading.Raw />
      </Flex>
    )
  }

  const title = cnjp(cn, jp)
  const size = title.length >= 20 ? 13 : title.length >= 14 ? 14 : 15

  const cover = image ? `https://lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT
  const _tags = String(tags)
    .split(' ')
    .filter(item => !!item && item !== '暂无')
  const tipStr = [
    type === 'TV' ? '' : type,
    String(ep).replace(/\(完结\)|第|\[|\]/g, ''),
    status,
    begin,
    official === '暂无' ? '' : official
  ]
    .filter(item => !!item)
    .join(' / ')
  const collection = collectionStore.collect(id)
  return (
    <Touchable
      style={styles.container}
      animate
      onPress={() => {
        navigation.push('Subject', {
          subjectId: id,
          _cn: cn,
          _image: cover,
          _aid: ageId
        })

        t('Anime.跳转', {
          subjectId: id
        })
      }}
    >
      <Flex style={styles.wrap} align='start'>
        <Cover src={cover} width={IMG_WIDTH_LG} height={IMG_HEIGHT_LG} radius shadow />
        <Flex.Item style={_.ml.wind}>
          <Flex align='start'>
            <Flex.Item>
              <Flex
                style={styles.content}
                direction='column'
                justify='between'
                align='start'
              >
                <Text size={size} bold numberOfLines={2}>
                  {title}
                </Text>
                <Text style={_.mt.sm} size={11} lineHeight={14}>
                  {tipStr}
                </Text>
              </Flex>
            </Flex.Item>
            <Manage
              subjectId={id}
              collection={collection}
              onPress={() => {
                uiStore.showManageModal(
                  {
                    subjectId: id,
                    title: cnjp(cn, jp),
                    desc: cnjp(jp, cn),
                    status:
                      MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection)
                  },
                  '找番剧'
                )
              }}
            />
          </Flex>
          <Flex style={styles.bottom}>
            <Flex>
              <Rank value={rank} />
              <Stars style={_.mr.xs} value={score} simple />
              {!!total && (
                <Text style={_.mr.sm} type='sub' size={11} bold>
                  ({total})
                </Text>
              )}
            </Flex>
            <Flex.Item>
              <Tags value={_tags} />
            </Flex.Item>
          </Flex>
        </Flex.Item>
      </Flex>
      {index === 0 && <Heatmap id='Anime.跳转' />}
    </Touchable>
  )
}

export default obc(Item)
