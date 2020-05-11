/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-10 13:14:06
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Expand, Text } from '@components'
import { SectionTitle, IconTouchable } from '@screens/_'
import { _ } from '@stores'

function Summary({ style }, { $ }) {
  const { _loaded } = $.subject
  if (_loaded && !$.summary) {
    return null
  }

  const styles = memoStyles()
  const { translateResult } = $.state
  const content = $.summary.replace(/\r\n\r\n/g, '\r\n')
  return (
    <View style={[_.container.wind, styles.container, style]}>
      <SectionTitle
        right={
          !translateResult.length && (
            <IconTouchable
              style={styles.iconTranslate}
              name='translate'
              size={16}
              onPress={$.doTranslate}
            />
          )
        }
      >
        简介
      </SectionTitle>
      {translateResult.length ? (
        <View>
          {translateResult.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <View key={index}>
              <Text style={_.mt.md} type='sub'>
                {item.src}
              </Text>
              <Text style={_.mt.sm} size={16}>
                {item.dst}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        !!content && (
          <Expand>
            <Text style={_.mt.sm} size={15} lineHeight={22}>
              {content}
            </Text>
          </Expand>
        )
      )}
    </View>
  )
}

Summary.contextTypes = {
  $: PropTypes.object
}

export default observer(Summary)

const memoStyles = _.memoStyles(_ => ({
  container: {
    minHeight: 120
  },
  iconTranslate: {
    marginRight: -_.sm
  }
}))
