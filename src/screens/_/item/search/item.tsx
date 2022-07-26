/*
 * @Author: czy0729
 * @Date: 2022-06-15 10:47:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-26 05:14:17
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { appNavigate } from '@utils'
import { memo } from '@utils/decorators'
import { IMG_WIDTH_LG, IMG_HEIGHT_LG, MODEL_RATING_STATUS } from '@constants'
import { Tag, Cover, Stars, Rank, Manage } from '../../base'
import Title from './title'
import { DEFAULT_PROPS } from './ds'
import { RatingStatus } from '@types'

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
    event,
    onManagePress
  }) => {
    global.rerender('Component.ItemSearch.Main')

    // 人物高清图不是正方形的图, 所以要特殊处理
    const isMono = !String(id).includes('/subject/')
    const isMusic = typeCn === '音乐'
    const justify = tip || position.length ? 'between' : 'start'
    return (
      <Touchable
        style={[styles.container, style]}
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
        <Flex align='start' style={styles.wrap}>
          <Cover
            src={cover}
            placeholder={!isMono}
            width={IMG_WIDTH_LG}
            height={isMono ? IMG_WIDTH_LG : IMG_HEIGHT_LG}
            radius
            shadow
            type={typeCn}
          />
          <Flex
            style={[
              styles.content,
              !!comments && styles.flux,
              isMusic && styles.musicContent
            ]}
            direction='column'
            justify={justify}
            align='start'
          >
            <Flex align='start' style={_.container.w100}>
              <Flex.Item>
                <Title name={name} nameCn={nameCn} comments={comments} />
              </Flex.Item>
              <Manage
                collection={collection}
                typeCn={typeCn}
                onPress={() => {
                  if (isMono) return

                  onManagePress({
                    subjectId: String(id).replace('/subject/', ''),
                    title: nameCn,
                    desc: name,
                    status: MODEL_RATING_STATUS.getValue<RatingStatus>(collection),
                    typeCn
                  })
                }}
              />
              {/* <Flex style={_.mt.xxs}>
                {!!_collection && <Tag style={_.ml.sm} value={_collection} />}
                {x18(id, nameCn) && <Tag style={_.ml.sm} value='H' />}
                {!!type && (
                  <Tag style={_.ml.sm} value={MODEL_SUBJECT_TYPE.getTitle(type)} />
                )}
              </Flex> */}
            </Flex>
            {!!tip && (
              <Text style={_.mt.sm} size={11} lineHeight={13} numberOfLines={3}>
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
