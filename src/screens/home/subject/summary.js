/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-13 09:38:55
 */
import React from 'react'
import { View } from 'react-native'
import { Expand, Text } from '@components'
import { SectionTitle } from '@screens/_'
import { _, systemStore } from '@stores'
import { obc, memo } from '@utils/decorators'
import IconTranslate from './icon/translate'

const defaultProps = {
  styles: {},
  showSummary: true,
  translateResult: [],
  content: '',
  onSwitchBlock: Function.prototype
}

const Summary = memo(
  ({ styles, showSummary, translateResult, content, onSwitchBlock }) => {
    rerender('Subject.Summary.Main')

    return (
      <View
        style={[
          _.container.wind,
          _.mt.lg,
          showSummary && styles.container,
          !showSummary && _.short
        ]}
      >
        <SectionTitle
          right={<IconTranslate />}
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
                  // eslint-disable-next-line react/no-array-index-key
                  <View key={index} style={_.mt.sm}>
                    <Text style={_.mt.md} type='sub' size={12} selectable>
                      {item.src}
                    </Text>
                    <Text style={_.mt.sm} size={15} bold selectable>
                      {item.dst}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              !!content && (
                <Expand moreStyle={styles.moreStyle}>
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
  defaultProps
)

export default obc((props, { $ }) => {
  rerender('Subject.Summary')

  if ($.subject._loaded && !$.summary) return null

  return (
    <Summary
      styles={memoStyles()}
      showSummary={systemStore.setting.showSummary}
      translateResult={$.state.translateResult}
      content={$.summary.replace(/\r\n\r\n/g, '\r\n')}
      onSwitchBlock={$.switchBlock}
    />
  )
})

const memoStyles = _.memoStyles(_ => ({
  container: {
    minHeight: 120
  },
  moreStyle: {
    marginRight: _.md
  }
}))
