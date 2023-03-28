/*
 * @Author: czy0729
 * @Date: 2022-06-15 10:47:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 17:29:08
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _, uiStore } from '@stores'
import { appNavigate, cnjp, getAction, stl } from '@utils'
import { memo } from '@utils/decorators'
import {
  IMG_WIDTH,
  IMG_WIDTH_LG,
  IMG_HEIGHT_LG,
  MODEL_COLLECTION_STATUS
} from '@constants'
import { CollectionStatus } from '@types'
import { Tag, Cover, Stars, Rank, Manage } from '../../base'
import Title from './title'
import { DEFAULT_PROPS } from './ds'

const Item = memo(
  ({
    navigation,
    styles,
    style,
    id,
    name,
    nameCn,
    cover,
    typeCn,
    tip,
    rank,
    score,
    total,
    comments,
    collection,
    position,
    event
  }) => {
    global.rerender('Component.ItemSearch.Main')

    // 人物高清图不是正方形的图, 所以要特殊处理
    const isMono = !String(id).includes('/subject/')
    const isMusic = typeCn === '音乐'
    const justify = tip || position.length ? 'between' : 'start'
    const subjectId = String(id).replace('/subject/', '')
    return (
      <Touchable
        style={stl(styles.container, style)}
        animate
        onPress={() => {
          appNavigate(
            String(id),
            navigation,
            {
              _jp: name,
              _cn: nameCn,
              _image: cover,
              _type: typeCn,
              _collection: collection
            },
            event
          )
        }}
      >
        <Flex style={styles.wrap} align='start'>
          <Cover
            src={cover}
            placeholder={!isMono}
            width={isMono ? IMG_WIDTH : IMG_WIDTH_LG}
            height={isMono ? IMG_WIDTH : IMG_HEIGHT_LG}
            radius
            shadow
            type={typeCn}
          />
          <Flex
            style={stl(
              styles.content,
              !!comments && styles.flux,
              isMusic && styles.musicContent
            )}
            direction='column'
            justify={justify}
            align='start'
          >
            <Flex style={_.container.block} align='start'>
              <Flex.Item>
                <Title name={name} nameCn={nameCn} comments={comments} />
              </Flex.Item>
              {!isMono && (
                <Manage
                  subjectId={subjectId}
                  collection={collection}
                  typeCn={typeCn}
                  onPress={() => {
                    uiStore.showManageModal({
                      subjectId,
                      title: cnjp(nameCn, name),
                      desc: cnjp(name, nameCn),
                      status:
                        MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection),
                      action: getAction(typeCn)
                    })
                  }}
                />
              )}
            </Flex>
            {!!tip && (
              <Text
                style={isMusic && _.mt.xs}
                size={11}
                lineHeight={13}
                numberOfLines={isMusic ? 2 : 3}
              >
                {tip}
              </Text>
            )}
            {!!position.length && (
              <Flex style={_.mt.sm} wrap='wrap'>
                {position.map(item => (
                  <Tag key={item} style={_.mr.sm} value={item} />
                ))}
              </Flex>
            )}
            <Flex style={_.mt.md}>
              <Rank value={rank} />
              <Stars value={score} />
              <Text style={_.ml.xxs} type='sub' size={11}>
                {total}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Touchable>
    )
  },
  DEFAULT_PROPS
)

export default Item
