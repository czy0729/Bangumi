/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-15 16:17:03
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Expand, Text } from '@components'
import { SectionTitle } from '@screens/_'
import { _ } from '@stores'

function Summary({ style }, { $ }) {
  const { _loaded } = $.subject
  if (_loaded && !$.summary) {
    return null
  }

  const styles = memoStyles()
  const content = $.summary.replace('\r\n\r\n', '\r\n')
  return (
    <View style={[_.container.wind, styles.container, style]}>
      <SectionTitle>简介</SectionTitle>
      {!!content && (
        <Expand>
          <Text style={_.mt.sm} size={15} lineHeight={22}>
            {content}
          </Text>
        </Expand>
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
    minHeight: 120,
    backgroundColor: _.colorPlain
  }
}))
