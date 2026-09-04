/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 18:12:30
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Flex } from '@components'
import { getSubjectId } from '@utils'
import { r } from '@utils/dev'
import { EVENT, FROZEN_ARRAY, IMG_HEIGHT_LG, IMG_WIDTH_LG } from '@constants'
import { PreventTouchPlaceholder } from '../../base'
import Container from './container'
import Content from './content'
import Cover from './cover'
import Manage from './manage'
import Postions from './positions'
import Rating from './rating'
import Tip from './tip'
import Title from './title'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

export { ITEM_SEARCH_HEIGHT } from './ds'

import type { Props as ItemSearchProps } from './types'
export type { ItemSearchProps }

/** 搜索结果条目 */
export const ItemSearch = observer(
  ({
    navigation,
    style,
    index = 0,
    id = '',
    name = '',
    nameCn = '',
    cover = '',
    typeCn = '',
    tip = '',
    rank = '',
    score = '',
    total = '',
    comments = '',
    collection = '',
    position = FROZEN_ARRAY,
    showManage = true,
    screen = '',
    highlight = '',
    event = EVENT
  }: ItemSearchProps) => {
    r(COMPONENT)

    const styles = memoStyles()

    const subjectId = getSubjectId(id)

    // 人物高清图不是正方形的图, 所以要特殊处理
    const isMono = !String(id).includes('/subject/')
    const isMusic = typeCn === '音乐'
    let width = isMono ? 56 : IMG_WIDTH_LG
    let height = isMono ? 56 : isMusic ? IMG_WIDTH_LG : IMG_HEIGHT_LG
    if (isMusic) {
      width = Math.floor(width * 1.1)
      height = Math.floor(height * 1.1)
    }

    const hasPositions = !!position.length

    return (
      <Component id='item-search' data-key={id}>
        <Container
          navigation={navigation}
          style={style}
          id={id}
          name={name}
          nameCn={nameCn}
          cover={cover}
          width={width}
          collection={collection}
          typeCn={typeCn}
          event={event}
        >
          <Flex style={styles.wrap} align='start'>
            <Cover
              index={index}
              width={width}
              height={height}
              cover={cover}
              subjectId={subjectId}
              typeCn={typeCn}
              isMono={isMono}
            />

            <Flex.Item>
              <Content tip={tip} comments={comments} position={hasPositions} isMusic={isMusic}>
                <Flex style={styles.title} align='start'>
                  <Flex.Item>
                    <Title name={name} nameCn={nameCn} comments={comments} highlight={highlight} />
                  </Flex.Item>

                  {showManage && !isMono && (
                    <Manage
                      subjectId={subjectId}
                      collection={collection}
                      typeCn={typeCn}
                      name={name}
                      nameCn={nameCn}
                      screen={screen}
                    />
                  )}
                </Flex>

                {!!tip && <Tip tip={tip} isMusic={isMusic} />}
                {hasPositions && <Postions position={position} />}
                <Rating rank={rank} score={score} total={total} />
              </Content>
            </Flex.Item>
          </Flex>
        </Container>

        <PreventTouchPlaceholder />
      </Component>
    )
  }
)

export default ItemSearch
