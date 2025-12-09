/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-23 23:38:09
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { Expand, Text } from '@components'
import { SectionTitle } from '@_'
import { _, systemStore } from '@stores'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { FROZEN_FN } from '@constants'
import { TITLE_SUMMARY } from '../../ds'
import IconHidden from '../icon/hidden'
import IconTranslate from '../icon/translate'
import { fixedTranslateResult } from '../utils'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Summary = memo(
  ({
    navigation,
    styles,
    subjectId = 0,
    showSummary = true,
    subjectHtmlExpand = true,
    translateResult,
    content = '',
    name = '',
    onSwitchBlock = FROZEN_FN
  }) => {
    const results = useMemo(
      () => (translateResult?.length ? fixedTranslateResult(translateResult, content) : []),
      [translateResult, content]
    )

    const elRight = useMemo(
      () =>
        showSummary ? (
          <IconTranslate content={content} />
        ) : (
          <IconHidden name={TITLE_SUMMARY} value='showSummary' />
        ),
      [content, showSummary]
    )

    const handleToggle = useCallback(() => onSwitchBlock('showSummary'), [onSwitchBlock])

    const handleNavigate = useCallback(() => {
      navigation.push('SubjectInfo', {
        subjectId,
        name,
        type: '简介'
      })

      t('条目.跳转', {
        to: 'SubjectInfo',
        type: 'Summary',
        subjectId
      })
    }, [name, navigation, subjectId])

    return (
      <View style={showSummary ? styles.container : styles.hide}>
        <SectionTitle
          right={elRight}
          icon={!showSummary && 'md-navigate-next'}
          splitStyles
          onPress={handleToggle}
        >
          {TITLE_SUMMARY}
        </SectionTitle>

        {showSummary && (
          <View>
            {results.length ? (
              <>
                {results.map((item, index) => (
                  <View key={index} style={_.mt.sm}>
                    {!!item.src && (
                      <Text style={_.mt.md} type='sub' size={12} lineHeight={14} selectable>
                        {item.src.trim()}
                      </Text>
                    )}
                    <Text style={_.mt.xs} size={15} lineHeight={17} selectable>
                      {item.dst.trim()}
                    </Text>
                  </View>
                ))}
                {systemStore.translateEngine === 'gemini' && (
                  <Text style={[_.mt.sm, _.mr.sm]} type='sub' size={10} bold align='right'>
                    by ✨Gemini
                  </Text>
                )}
              </>
            ) : (
              !!content && (
                <Expand ratio={0.88} onPress={subjectHtmlExpand ? undefined : handleNavigate}>
                  <Text style={_.mt.md} size={15} lineHeight={22} selectable>
                    {content}
                  </Text>
                </Expand>
              )
            )}
          </View>
        )}
      </View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN,
  props => ({
    ...props,
    translateResult: props.translateResult?.length
  })
)

export default Summary
