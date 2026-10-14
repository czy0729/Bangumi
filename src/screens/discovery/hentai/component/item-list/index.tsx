/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找 Hentai 列表布局条目
 */
import { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex, flexStyle, Heatmap, Loading, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, getTitleSize, Manage, Rank, Stars, Tag } from '@_'
import { _, collectionStore, otaStore, uiStore, useStore } from '@stores'
import { stl } from '@utils'
import { t } from '@utils/fetch'
import { HENTAI_TAGS } from '@utils/subject/hentai'
import {
  HOST_BGM_STATIC,
  IMG_DEFAULT,
  IMG_HEIGHT_LG,
  IMG_WIDTH_LG,
  MODEL_COLLECTION_STATUS,
  TEXT_ONLY
} from '@constants'
import { getType } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { CollectionStatus } from '@types'
import type { Ctx } from '../../types'
import type { Props } from '../types'

function ItemList({ index, pickIndex }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const subjectId = otaStore.hentaiSubjectId(pickIndex)
  const hentai = otaStore.hentai(subjectId)

  const handlePress = useCallback(() => {
    if (!hentai?.id) return

    const image = hentai.i ? `${HOST_BGM_STATIC}/pic/cover/m/${hentai.i}.jpg` : IMG_DEFAULT
    navigation.push('Subject', {
      subjectId: hentai.id,
      _cn: hentai.c,
      _image: getCoverSrc(image, IMG_WIDTH_LG),
      _hid: hentai.h
    })

    t('Hentai.跳转', {
      subjectId: hentai.id
    })
  }, [hentai, navigation])

  const handleManage = useCallback(() => {
    if (!hentai?.id) return

    uiStore.showManageModal(
      {
        subjectId: hentai.id,
        title: hentai.c,
        status: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(
          collectionStore.collect(hentai.id)
        )
      },
      '找Hentai'
    )
  }, [hentai])

  /**
   * 必须放在 `if (!hentai?.id)` 之前
   *  - 数据未就绪时首次渲染会走 loading 分支, 若把 hook 写在提前 return 之后,
   *    后续渲染就会报 Rendered more hooks than during the previous render
   *  - 稳定 style 引用, 避免每次渲染生成新数组击穿子组件 memo
   */
  const itemStyle = useMemo(
    () => stl(flexStyle({ align: 'start' }), styles.container, styles.wrap),
    [styles]
  )

  if (!hentai?.id) {
    return (
      <Flex style={styles.loading} justify='center'>
        <Loading.Raw />
      </Flex>
    )
  }

  const { id, c: cn, i: image, e: ep, a: air, t: tags = [], s: score, r: rank, n: total } = hentai

  const titleSize = getTitleSize(cn)
  const cover = image ? `${HOST_BGM_STATIC}/pic/cover/m/${image}.jpg` : IMG_DEFAULT
  const tip = [ep ? `${ep}话` : '', air].filter(item => !!item).join(' / ')
  const collection = collectionStore.collect(id)
  const isLogin = $.isLogin

  return (
    <Touchable style={itemStyle} animate onPress={handlePress}>
      <Cover
        src={cover}
        width={IMG_WIDTH_LG}
        height={IMG_HEIGHT_LG}
        radius
        cdn={false}
        textOnly={TEXT_ONLY || !isLogin}
      />
      <Flex.Item style={_.ml.wind}>
        <Flex
          style={isLogin && tags.length >= 14 ? styles.contentFlux : styles.content}
          direction='column'
          justify='between'
          align='start'
        >
          <Flex align='start'>
            <Flex.Item>
              <Text size={titleSize} bold numberOfLines={2}>
                {cn}
              </Text>
              <Text style={_.mt.sm} size={11} lineHeight={14} numberOfLines={3}>
                {tip}
              </Text>
            </Flex.Item>
            <Manage subjectId={id} collection={collection} onPress={handleManage} />
          </Flex>
          {isLogin && !!tags.length && (
            <Flex style={_.mt.sm} wrap='wrap'>
              {tags.map((item: number) => (
                <Tag
                  key={item}
                  style={styles.tag}
                  type={getType($.state.query, item)}
                  value={HENTAI_TAGS[item]}
                />
              ))}
              <Tag value={`+${tags.length}`} />
            </Flex>
          )}
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
      {index === 0 && <Heatmap id='Hentai.跳转' />}
    </Touchable>
  )
}

export default observer(ItemList)
