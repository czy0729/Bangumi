/*
 * @Author: czy0729
 * @Date: 2022-06-15 10:47:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 19:21:08
 */
import React from 'react'
import { Flex } from '@components'
import { memo } from '@utils/decorators'
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
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Item = memo(
  ({
    navigation,
    styles,
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
  }) => {
    const subjectId = String(id).replace('/subject/', '')

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
      <>
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
          </Flex>
        </Container>

        <PreventTouchPlaceholder />
      </>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Item
