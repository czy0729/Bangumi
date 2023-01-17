/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-18 02:20:20
 */
import React from 'react'
import { Flex, Text, Touchable, Iconfont, Heatmap } from '@components'
import { Cover as CompCover, IconTouchable } from '@_'
import { _, systemStore } from '@stores'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import Item from './item'
import { COVER_WIDTH, COVER_HEIGHT, DEFAULT_PROPS } from './ds'

export default memo(
  ({
    navigation,
    styles,
    showRelation,
    size,
    subjectId,
    subjectPrev,
    subjectAfter,
    subjectSeries,
    subjectAnime,
    subjectDiff
  }) => {
    global.rerender('Subject.Series.Main')

    if (subjectPrev || subjectAfter || subjectAnime || subjectDiff) {
      let i = 0
      if (subjectPrev) i += 1
      if (subjectAfter) i += 1
      if (subjectAnime) i += 1
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
            _image: subjectSeries.image
          })
        }}
      >
        <Flex>
          <Text size={13}>⤷</Text>
          <CompCover
            style={styles.cover}
            src={subjectSeries.image}
            size={COVER_WIDTH}
            height={COVER_HEIGHT}
            radius={_.radiusSm}
            placeholder={false}
            fadeDuration={0}
            noDefault
          />
          <Text style={_.ml.sm} size={size} bold>
            {subjectSeries.title}
          </Text>
        </Flex>
        <Heatmap id='条目.跳转' from='系列' />
      </Touchable>
    )
  },
  DEFAULT_PROPS
)
