/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-08 06:49:01
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Expand, Text } from '@components'
import { SectionTitle } from '@_'
import { _, systemStore } from '@stores'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TITLE_SUMMARY } from '../../ds'
import IconHidden from '../icon/hidden'
import IconTranslate from '../icon/translate'
import { fixedTranslateResult } from '../utils'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Summary = memo(
  ({
    navigation,
    styles,
    subjectId,
    showSummary,
    translateResult,
    content,
    name,
    onSwitchBlock
  }) => {
    const handlePress = useCallback(() => {
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subjectId])

    return (
      <View style={showSummary ? styles.container : styles.hide}>
        <SectionTitle
          right={
            showSummary ? (
              <IconTranslate content={content} />
            ) : (
              <IconHidden name={TITLE_SUMMARY} value='showSummary' />
            )
          }
          icon={!showSummary && 'md-navigate-next'}
          onPress={() => onSwitchBlock('showSummary')}
        >
          {TITLE_SUMMARY}
        </SectionTitle>
        {showSummary && (
          <View>
            {translateResult.length ? (
              <View>
                {fixedTranslateResult(translateResult, content).map((item, index) => (
                  <View key={index} style={_.mt.sm}>
                    <Text style={_.mt.md} type='sub' size={12} lineHeight={14} selectable>
                      {item.src.trim()}
                    </Text>
                    <Text style={_.mt.sm} size={15} lineHeight={17} bold selectable>
                      {item.dst.trim()}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              !!content && (
                <Expand
                  ratio={0.88}
                  onPress={systemStore.setting.subjectHtmlExpand ? undefined : handlePress}
                >
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
    translateResult: props.translateResult.length
  })
)

export default Summary
