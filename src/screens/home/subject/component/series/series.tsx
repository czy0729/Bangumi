/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-17 06:41:03
 */
import React from 'react'
import { Cover, Flex, Heatmap, Iconfont, Link, Squircle, Text } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { _ } from '@stores'
import { x18 } from '@utils'
import { memo } from '@utils/decorators'
import { WEB } from '@constants'
import Item from './item'
import { COMPONENT_MAIN, COVER_HEIGHT, COVER_WIDTH, DEFAULT_PROPS } from './ds'

const Series = memo(
  ({
    styles,
    showRelation = true,
    size = 14,
    subjectId = 0,
    subjectPrev,
    subjectAfter,
    subjectAnime,
    subjectDiff,
    subjectBook,
    subjectSeries
  }) => {
    // 有前传/续集/动画/不同演绎/书籍，就渲染「关系分支」
    if (subjectPrev || subjectAfter || subjectAnime || subjectDiff || subjectBook) {
      // 前传 + 续集 + 动画 + 不同演绎数量，用来决定后面是否还能渲染
      const count =
        (subjectPrev ? 1 : 0) +
        (subjectAfter ? 1 : 0) +
        (subjectAnime ? 1 : 0) +
        (subjectDiff ? 1 : 0)

      return (
        <Flex style={showRelation && styles.relation}>
          <Flex.Item>
            {showRelation && (
              <Flex>
                <Iconfont name='md-subdirectory-arrow-right' size={16} />
                {!!subjectPrev && <Item data={subjectPrev} from='前传' />}
                {!!subjectAfter && <Item data={subjectAfter} from='续集' />}
                {count <= 1 && !!subjectAnime && <Item data={subjectAnime} from='动画' />}
                {count <= 1 && !!subjectDiff && <Item data={subjectDiff} from='不同演绎' />}
                {count <= 1 && !!subjectBook && <Item data={subjectBook} from='书籍' />}
              </Flex>
            )}
          </Flex.Item>
        </Flex>
      )
    }

    // 没有前面几类，兜底显示系列
    return (
      <Link
        style={styles.series}
        path='Subject'
        params={{
          subjectId: subjectSeries.id,
          _jp: subjectSeries.title,
          _image: getCoverSrc(subjectSeries.image, COVER_WIDTH)
        }}
        eventId='条目.跳转'
        eventData={{
          to: 'Subject',
          from: '系列',
          subjectId
        }}
      >
        <Flex>
          <Text size={13}>⤷</Text>
          <Squircle style={_.ml.sm} width={COVER_WIDTH} height={COVER_HEIGHT} radius={4}>
            <Cover
              src={subjectSeries.image}
              size={COVER_WIDTH}
              height={COVER_HEIGHT}
              cdn={!x18(subjectId)}
              fadeDuration={0}
              skeleton={false}
              noDefault
            />
          </Squircle>
          <Flex.Item style={_.ml.sm}>
            <Text size={WEB ? 12 : size} bold>
              {subjectSeries.title}
            </Text>
          </Flex.Item>
        </Flex>
        <Heatmap id='条目.跳转' from='系列' />
      </Link>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Series
