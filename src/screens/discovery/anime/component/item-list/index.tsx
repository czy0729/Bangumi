/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-25 06:55:46
 */
import React from 'react'
import { Flex, Heatmap, Loading, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, InView, Manage, Rank, Stars, Tags } from '@_'
import { _, collectionStore, otaStore, uiStore } from '@stores'
import { cnjp, x18 } from '@utils'
import { obc } from '@utils/decorators'
import { withT } from '@utils/fetch'
import { IMG_DEFAULT, IMG_HEIGHT_LG, IMG_WIDTH_LG, MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatus } from '@types'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function ItemList({ index, pickIndex }, { navigation }: Ctx) {
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
    origin,
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
    official === '暂无' ? '' : official,
    origin === '暂无' ? '' : origin
  ]
    .filter(item => !!item)
    .join(' / ')
  const collection = collectionStore.collect(id)

  return (
    <Touchable
      style={styles.container}
      animate
      onPress={withT(
        () => {
          navigation.push('Subject', {
            subjectId: id,
            _cn: cn,
            _image: getCoverSrc(cover, IMG_WIDTH_LG),
            _aid: ageId
          })
        },
        'Anime.跳转',
        {
          subjectId: id
        }
      )}
    >
      <Flex style={styles.wrap} align='start'>
        <InView style={styles.inView} y={_.window.height * 0.4 + IMG_HEIGHT_LG * index}>
          <Cover src={cover} width={IMG_WIDTH_LG} height={IMG_HEIGHT_LG} radius cdn={!x18(id)} />
        </InView>
        <Flex.Item style={_.ml.wind}>
          <Flex align='start'>
            <Flex.Item>
              <Flex style={styles.content} direction='column' justify='between' align='start'>
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
                    status: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection)
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

export default obc(ItemList, COMPONENT)
