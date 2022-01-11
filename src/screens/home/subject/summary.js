/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-11 05:35:18
 */
import React from 'react'
import { View } from 'react-native'
import { Expand, Text } from '@components'
import { SectionTitle } from '@screens/_'
import { _, systemStore } from '@stores'
import { obc, memo } from '@utils/decorators'
import IconTranslate from './icon/translate'
import IconHidden from './icon/hidden'

const defaultProps = {
  showSummary: true,
  translateResult: [],
  content: '',
  onSwitchBlock: Function.prototype
}

const Summary = memo(
  ({ showSummary, translateResult, content, onSwitchBlock }) => {
    rerender('Subject.Summary.Main')

    return (
      <View
        style={[
          _.container.wind,
          _.mt.sm,
          showSummary && styles.container,
          !showSummary && _.short
        ]}
      >
        <SectionTitle
          right={
            showSummary ? (
              <IconTranslate />
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
                    <Text style={_.mt.md} type='sub' size={12} selectable>
                      {item.src.trim()}
                    </Text>
                    <Text style={_.mt.sm} size={15} bold selectable>
                      {item.dst.trim()}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              !!content && (
                <Expand>
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
  defaultProps,
  ({ translateResult, ...other }) => ({
    translateResult: translateResult.length,
    ...other
  })
)

export default obc((props, { $ }) => {
  rerender('Subject.Summary')

  const { showSummary } = systemStore.setting
  if (showSummary === -1 || ($.subject._loaded && !$.summary)) return null

  return (
    <Summary
      showSummary={showSummary}
      translateResult={$.state.translateResult}
      content={$.summary.replace(/\r\n\r\n/g, '\r\n')}
      onSwitchBlock={$.switchBlock}
    />
  )
})

const styles = {
  container: {
    minHeight: 120
  }
}
