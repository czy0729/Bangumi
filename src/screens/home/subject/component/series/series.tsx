/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-03 18:42:24
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

import type { ReactNode } from '@types'

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
    // 有前传/续集/动画/不同演绎/书籍，就渲染「关系分支」，最多显示 2 个
    if (subjectPrev || subjectAfter || subjectAnime || subjectDiff || subjectBook) {
      let displayed = 0
      const maxDisplay = 2
      const items: ReactNode[] = []
      const pushItem = (data: any, label: string) => {
        if (data && displayed < maxDisplay) {
          items.push(<Item key={label} data={data} from={label} />)
          displayed += 1
        }
      }

      // 按优先顺序渲染
      pushItem(subjectPrev, '前传')
      pushItem(subjectAfter, '续集')
      pushItem(subjectAnime, '动画')
      pushItem(subjectDiff, '不同演绎')
      pushItem(subjectBook, '书籍')

      return (
        <Flex style={showRelation && styles.relation}>
          <Flex.Item>
            {showRelation && (
              <Flex>
                <Iconfont name='md-subdirectory-arrow-right' size={16} />
                {items}
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
