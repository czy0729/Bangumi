/*
 * @Author: czy0729
 * @Date: 2022-07-25 23:12:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 05:28:29
 */
import React from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { Manage } from '@_'
import { _, uiStore } from '@stores'
import { HTMLDecode } from '@utils'
import { memo } from '@utils/decorators'
import { FROZEN_OBJECT, MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatus } from '@types'
import Desc from '../../desc'
import Cover from './cover'
import Rating from './rating'
import Time from './time'
import Title from './title'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const ItemLine = memo(
  ({
    styles,
    index = 0,
    hideScore = false,
    subjectId = 0,
    name = '',
    desc = '',
    image = '',
    time = '2359',
    prevTime = '',
    expand = false,
    collection,
    rank = 0,
    score = 0,
    total = 0,
    sites = FROZEN_OBJECT
  }) => {
    return (
      <View style={_.container.block}>
        <Flex style={styles.item} align='start'>
          <Time time={time} prevTime={prevTime} expand={expand} />
          {(expand || (!expand && time && time !== '2359')) && (
            <>
              <Cover index={index} subjectId={subjectId} image={image} name={name} />
              <Flex.Item style={_.ml.md}>
                <Flex style={styles.body} direction='column' justify='between' align='start'>
                  <Title name={name} />
                  <Desc style={styles.desc} subjectId={subjectId} sites={sites} />
                  <Rating hideScore={hideScore} rank={rank} score={score} total={total} />
                </Flex>
              </Flex.Item>
              <Manage
                subjectId={subjectId}
                collection={collection}
                onPress={() => {
                  uiStore.showManageModal(
                    {
                      subjectId,
                      title: HTMLDecode(name),
                      desc,
                      status: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection)
                    },
                    '每日放送'
                  )
                }}
              />
            </>
          )}
        </Flex>
      </View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default ItemLine
