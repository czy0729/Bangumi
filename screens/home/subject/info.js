/*
 * @Author: czy0729
 * @Date: 2019-08-23 00:24:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-20 17:37:44
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Expand, RenderHtml } from '@components'
import { SectionTitle } from '@screens/_'
import { appNavigate } from '@utils/app'
import _ from '@styles'

function Info({ style }, { $, navigation }) {
  const { info } = $.subjectFormHTML
  return (
    <View style={[styles.container, style]}>
      <SectionTitle style={_.container.wind}>详情</SectionTitle>
      {!!info && (
        <Expand>
          <RenderHtml
            style={styles.info}
            html={info}
            baseFontStyle={{
              fontSize: 13 + _.fontSizeAdjust,
              lineHeight: 22,
              color: _.colorTitle
            }}
            onLinkPress={href => appNavigate(href, navigation)}
          />
        </Expand>
      )}
    </View>
  )
}

Info.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Info)

const styles = StyleSheet.create({
  container: {
    minHeight: 120
  },
  info: {
    paddingHorizontal: _.wind
  }
})
