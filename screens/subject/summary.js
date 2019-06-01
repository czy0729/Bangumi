/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-01 15:18:34
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Expand, Text } from '@components'
import { SectionTitle } from '@screens/_'
import _ from '@styles'

const Summary = ({ style }, { $ }) => {
  const { summary, _loaded } = $.subject
  if (_loaded && !summary) {
    return null
  }

  return (
    <View style={[_.container.wind, styles.container, style]}>
      <SectionTitle>简介</SectionTitle>
      {!!summary && (
        <Expand>
          <Text style={_.mt.sm} size={15} lineHeight={22}>
            {summary}
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

const styles = StyleSheet.create({
  container: {
    minHeight: 120
  }
})
