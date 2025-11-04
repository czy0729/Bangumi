/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-04 19:10:00
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Flex, Loading, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, InView, Manage, Rank, Stars, Tags } from '@_'
import { _, collectionStore, otaStore, uiStore, useStore } from '@stores'
import { cnjp, desc, x18 } from '@utils'
import { withT } from '@utils/fetch'
import { IMG_DEFAULT, IMG_HEIGHT_LG, IMG_WIDTH_LG, MODEL_COLLECTION_STATUS } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { CollectionStatus } from '@types'
import type { Ctx } from '../../types'
import type { Props } from './types'

function ItemList({ index, pickIndex }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    const subjectId = otaStore.animeSubjectId(pickIndex)
    const anime = otaStore.anime(subjectId)

    if (!anime?.id) {
      return (
        <Flex style={styles.loading} justify='center'>
          <Loading.Raw />
        </Flex>
      )
    }

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
      tags: tagStr,
      official,
      origin,
      score,
      rank,
      total
    } = anime

    const title = cnjp(cn, jp)
    const titleLen = title.length
    const titleSize = titleLen >= 20 ? 13 : titleLen >= 14 ? 14 : 15
    const cover = image ? `https://lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT

    const epStr = String(ep).replace(/\(完结\)|第|\[|\]/g, '')
    const tipStr = [type === 'TV' ? '' : type, epStr, status, begin]
      .concat([official, origin].map(v => (v === '暂无' ? '' : v)))
      .filter(Boolean)
      .join(' / ')

    const { tags = [] } = $.state.query
    const cates = String(tagStr)
      .split(' ')
      .filter(v => v && v !== '暂无')
      .sort((a, b) => desc(tags.includes(a) ? 1 : 0, tags.includes(b) ? 1 : 0))

    const collection = collectionStore.collect(id)

    const handlePress = withT(
      () => {
        navigation.push('Subject', {
          subjectId: id,
          _cn: cn,
          _image: getCoverSrc(cover, IMG_WIDTH_LG),
          _aid: ageId
        })
      },
      'Anime.跳转',
      { subjectId: id }
    )

    const handleManage = () => {
      uiStore.showManageModal(
        {
          subjectId: id,
          title,
          desc: cnjp(jp, cn),
          status: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection)
        },
        '找番剧'
      )
    }

    return (
      <Touchable style={styles.container} animate onPress={handlePress}>
        <Flex style={styles.wrap} align='start'>
          <InView style={styles.inView} y={_.window.height * 0.4 + IMG_HEIGHT_LG * index}>
            <Cover src={cover} width={IMG_WIDTH_LG} height={IMG_HEIGHT_LG} radius cdn={!x18(id)} />
          </InView>

          <Flex.Item style={_.ml.wind}>
            <Flex style={styles.content} direction='column' justify='between' align='start'>
              <Flex align='start'>
                <Flex.Item>
                  <Text size={titleSize} bold numberOfLines={2}>
                    {title}
                  </Text>
                </Flex.Item>
                <Manage subjectId={id} collection={collection} onPress={handleManage} />
              </Flex>

              <Text style={styles.tip} size={11} lineHeight={14}>
                {tipStr}
              </Text>

              <Flex>
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
                  <Tags value={cates} active={tags} />
                </Flex.Item>
              </Flex>
            </Flex>
          </Flex.Item>
        </Flex>
      </Touchable>
    )
  })
}

export default ItemList
