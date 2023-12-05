/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-20 21:05:57
 */
import React from 'react'
import { View } from 'react-native'
import { Expand, Text } from '@components'
import { SectionTitle } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { rerender } from '@utils/dev'
import IconTranslate from '../icon/translate'
import IconHidden from '../icon/hidden'
import { DEFAULT_PROPS } from './ds'

export default memo(
  ({ styles, showSummary, translateResult, content, onSwitchBlock }) => {
    rerender('Subject.Summary.Main')

    return (
      <View style={showSummary ? styles.container : styles.hide}>
        <SectionTitle
          right={
            showSummary ? (
              <IconTranslate content={content} />
            ) : (
              <IconHidden name='简介' value='showSummary' />
            )
          }
          icon={!showSummary && 'md-navigate-next'}
          onPress={() => onSwitchBlock('showSummary')}
        >
          简介
        </SectionTitle>
        {showSummary && (
          <View>
            {translateResult.length ? (
              <View>
                {translateResult.map((item, index) => (
                  <View key={index} style={_.mt.sm}>
                    <Text
                      style={_.mt.md}
                      type='sub'
                      size={12}
                      lineHeight={14}
                      selectable
                    >
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
                <Expand ratio={0.88}>
                  <Text style={_.mt.sm} size={15} lineHeight={22} selectable>
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
  ({ translateResult, ...other }: { translateResult: any[] }) => ({
    translateResult: translateResult.length,
    ...other
  })
)
