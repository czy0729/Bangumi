/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:14:14
 */
import { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { Expand, Text } from '@components'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TITLE_SUMMARY } from '../../ds'
import BlockTitle from '../block-title'
import IconHtmlExpand from '../icon/html-expand'
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
    name = ''
  }) => {
    const results = useMemo(
      () => (translateResult?.length ? fixedTranslateResult(translateResult, content) : []),
      [translateResult, content]
    )

    const elRight = useMemo(
      () => (showSummary ? <IconTranslate content={content} /> : null),
      [content, showSummary]
    )

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
      <View style={stl(styles.container, !showSummary && styles.containerNotShow)}>
        <BlockTitle
          layoutKey='showSummary'
          right={elRight}
          icon={!showSummary && 'md-navigate-next'}
          splitStyles
        >
          {TITLE_SUMMARY}
        </BlockTitle>

        {showSummary && (
          <View>
            {results.length ? (
              <>
                {results.map(item => (
                  <View key={`${item.src}|${item.dst}`} style={_.mt.sm}>
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
                  <Text style={stl(_.mt.sm, _.mr.sm)} type='sub' size={10} bold align='right'>
                    by ✨Gemini
                  </Text>
                )}
              </>
            ) : (
              !!content && (
                <Expand
                  style={_.mt.sm}
                  ratio={0.88}
                  onPress={subjectHtmlExpand ? undefined : handleNavigate}
                >
                  <View style={styles.content}>
                    <Text size={15} lineHeight={22} selectable>
                      {content}
                    </Text>
                    {subjectHtmlExpand && <IconHtmlExpand />}
                  </View>
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
