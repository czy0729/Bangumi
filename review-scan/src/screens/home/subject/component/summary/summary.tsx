/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 07:13:26
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Expand, Text } from '@components'
import { SectionTitle } from '@_'
import { _, systemStore } from '@stores'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { FROZEN_ARRAY, FROZEN_FN } from '@constants'
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
    translateResult = FROZEN_ARRAY,
    content = '',
    name = '',
    onSwitchBlock = FROZEN_FN
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
          splitStyles
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
                    {!!item.src && (
                      <Text
                        style={[_.mt.md, _.mb.xs]}
                        type='sub'
                        size={12}
                        lineHeight={14}
                        selectable
                      >
                        {item.src.trim()}
                      </Text>
                    )}
                    <Text style={_.mt.xs} size={15} lineHeight={17} selectable>
                      {item.dst.trim()}
                    </Text>
                  </View>
                ))}
                {systemStore.setting.translateEngine === 'deeplx' && (
                  <Text style={[_.mt.sm, _.mr.sm]} type='sub' size={10} bold align='right'>
                    by DeepLX
                  </Text>
                )}
              </View>
            ) : (
              !!content && (
                <Expand ratio={0.88} onPress={subjectHtmlExpand ? undefined : handlePress}>
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
