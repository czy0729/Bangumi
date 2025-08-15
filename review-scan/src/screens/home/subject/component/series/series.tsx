/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 07:11:00
 */
import React from 'react'
import { Cover, Flex, Heatmap, Iconfont, Squircle, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { IconTouchable } from '@_'
import { _, systemStore } from '@stores'
import { x18 } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { WEB } from '@constants'
import Item from './item'
import { COMPONENT_MAIN, COVER_HEIGHT, COVER_WIDTH, DEFAULT_PROPS } from './ds'

const Series = memo(
  ({
    navigation,
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
    if (subjectPrev || subjectAfter || subjectAnime || subjectDiff || subjectBook) {
      let i = 0
      if (subjectPrev) i += 1
      if (subjectAfter) i += 1
      if (subjectAnime) i += 1
      if (subjectDiff) i += 1
      return (
        <Flex style={showRelation && styles.relation}>
          <Flex.Item>
            {showRelation && (
              <Flex>
                <Iconfont name='md-subdirectory-arrow-right' size={16} />
                {!!subjectPrev && <Item data={subjectPrev} from='前传' />}
                {!!subjectAfter && <Item data={subjectAfter} from='续集' />}
                {i <= 1 && !!subjectAnime && <Item data={subjectAnime} from='动画' />}
                {i <= 1 && !!subjectDiff && <Item data={subjectDiff} from='不同演绎' />}
                {i <= 1 && !!subjectBook && <Item data={subjectBook} from='书籍' />}
              </Flex>
            )}
          </Flex.Item>
          <IconTouchable
            style={styles.icon}
            name={showRelation ? 'md-keyboard-arrow-up' : 'md-navigate-next'}
            size={24}
            onPress={() => systemStore.switchSetting('showRelation')}
          />
        </Flex>
      )
    }

    return (
      <Touchable
        style={styles.series}
        onPress={() => {
          t('条目.跳转', {
            to: 'Subject',
            from: '系列',
            subjectId
          })

          navigation.push('Subject', {
            subjectId: subjectSeries.id,
            _jp: subjectSeries.title,
            _image: getCoverSrc(subjectSeries.image, COVER_WIDTH)
          })
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
          <Text style={_.ml.sm} size={WEB ? 12 : size} bold>
            {subjectSeries.title}
          </Text>
        </Flex>
        <Heatmap id='条目.跳转' from='系列' />
      </Touchable>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Series
