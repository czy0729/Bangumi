/*
 * @Author: czy0729
 * @Date: 2020-09-03 10:47:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 17:01:32
 */
import React from 'react'
import { Flex, Text, Touchable, Heatmap, Loading } from '@components'
import { _, otaStore, collectionStore, uiStore } from '@stores'
import { Tag, Cover, Stars, Rank, Manage } from '@_'
import { fill } from '@utils/dev'
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
import Tags from './tags'
import { memoStyles } from './styles'

function Item({ index, pickIndex }, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const subjectId = otaStore.wenkuSubjectId(pickIndex)
  const {
    id,
    wid,
    image,
    cn,
    ep,
    status,
    begin,
    update,
    score,
    rank,
    total,
    cate,
    author,
    len,
    hot,
    up,
    anime,
    tags
  } = otaStore.wenku(subjectId)
  if (!id) {
    return (
      <Flex style={styles.loading} justify='center'>
        <Loading.Raw />
      </Flex>
    )
  }

  const size = cn.length >= 20 ? 13 : cn.length >= 14 ? 14 : 15

  const { sort } = $.state.query
  const tip = [
    status === 1 ? '完结' : '连载',
    begin || update,
    cate,
    author,
    len ? `${len}万字` : '',
    ep
  ]
  if (sort === '更新' && update) tip.push(`${update} 更新`)
  const tipStr = tip.filter(item => !!item).join(' / ')
  const hotStr = fill('', hot, '◆')
  const upStr = fill('', up, '▲')

  const cover = image ? `https://lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT
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
          _wid: wid
        })

        t('游戏.跳转', {
          subjectId: id
        })
      }}
    >
      <Flex style={styles.wrap} align='start'>
        <Cover
          src={cover}
          width={IMG_WIDTH_LG}
          height={IMG_HEIGHT_LG}
          radius
          shadow
          type='书籍'
        />
        <Flex.Item style={_.ml.wind}>
          <Flex align='start'>
            <Flex.Item>
              <Flex
                style={styles.content}
                direction='column'
                justify='between'
                align='start'
              >
                <Text size={size} bold numberOfLines={3}>
                  {cn || '-'}
                </Text>
                <Text style={_.mt.sm} size={11} lineHeight={14} numberOfLines={3}>
                  {tipStr}
                </Text>
                <Flex style={[_.container.block, _.mt.sm]}>
                  <Flex.Item>
                    {!!hotStr && (
                      <Text size={10} bold type='sub'>
                        热度　{hotStr}
                      </Text>
                    )}
                  </Flex.Item>
                  <Flex.Item>
                    {!!upStr && (
                      <Text size={10} bold type='sub'>
                        趋势　{upStr}
                      </Text>
                    )}
                  </Flex.Item>
                </Flex>
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
                    title: cn,
                    status:
                      MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection),
                    action: '读'
                  },
                  '找文库'
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
            {!!anime && <Tag style={_.mr.sm} value='动画化' />}
            <Flex.Item>
              <Tags value={tags} />
            </Flex.Item>
          </Flex>
        </Flex.Item>
      </Flex>
      {index === 0 && <Heatmap id='游戏.跳转' />}
    </Touchable>
  )
}

export default obc(Item)
