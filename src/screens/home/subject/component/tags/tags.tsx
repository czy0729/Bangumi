/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-26 16:30:54
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Iconfont, ScrollView, Touchable } from '@components'
import { PreventTouchPlaceholder, SectionTitle } from '@_'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { FROZEN_FN } from '@constants'
import { TITLE_TAGS } from '../../ds'
import IconGame from '../icon/game'
import IconHidden from '../icon/hidden'
import RecSegement from './rec-segment'
import TagsList from './tags-list'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Tags = memo(
  ({
    styles,
    show = true,
    showTags = true,
    showTyperank = false,
    subjectTagsExpand = true,
    rank = 0,
    focusOrigin = false,
    onSwitchBlock = FROZEN_FN
  }) => {
    const elRight = useMemo(
      () =>
        showTags ? (
          <>
            {!focusOrigin && <IconGame />}
            {!!rank && <RecSegement />}
          </>
        ) : (
          <IconHidden name={TITLE_TAGS} value='showTags' />
        ),
      [focusOrigin, rank, showTags]
    )

    const handleToggle = useCallback(() => onSwitchBlock('showTags'), [onSwitchBlock])

    return (
      <View style={stl(_.mt.lg, showTags ? styles.container : _.short, !show && _.mb.md)}>
        <SectionTitle
          style={_.container.wind}
          right={elRight}
          icon={!showTags && 'md-navigate-next'}
          splitStyles
          onPress={handleToggle}
        >
          {TITLE_TAGS}
        </SectionTitle>

        {show && (
          <>
            {subjectTagsExpand ? (
              <View style={styles.tags}>
                <Flex wrap='wrap' align='start'>
                  <TagsList showTyperank={showTyperank} />
                </Flex>
                <Heatmap id='条目.跳转' from={TITLE_TAGS} />
              </View>
            ) : (
              <ScrollView style={_.mt.md} contentContainerStyle={_.container.wind} horizontal>
                <TagsList showTyperank={showTyperank} />
              </ScrollView>
            )}
          </>
        )}

        {show && (
          <View style={styles.more}>
            <Touchable onPress={() => systemStore.switchSetting('subjectTagsExpand')}>
              <Flex justify='center'>
                <Iconfont
                  name={subjectTagsExpand ? 'md-keyboard-arrow-up' : 'md-keyboard-arrow-down'}
                  size={_.device(24, 32)}
                />
              </Flex>
            </Touchable>
          </View>
        )}

        <PreventTouchPlaceholder />
      </View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Tags
