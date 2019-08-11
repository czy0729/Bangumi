/*
 * @Author: czy0729
 * @Date: 2019-06-02 02:26:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-11 04:30:58
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Expand, Text } from '@components'
import { SectionTitle } from '@screens/_'
import { appNavigate } from '@utils/app'
import _ from '@styles'

const Disc = ({ style }, { $, navigation }) => {
  const { disc = [] } = $.subjectFormHTML
  return (
    <View style={[_.container.wind, styles.container, style]}>
      <SectionTitle>曲目列表</SectionTitle>
      {!!disc.length && (
        <Expand style={_.mt.md}>
          {disc.map((item, index) => (
            <View key={item.title} style={!!index && _.mt.md}>
              <Text type='sub' size={16}>
                {item.title}
              </Text>
              <View style={_.mt.sm}>
                {item.disc.map((i, idx) => (
                  <Text
                    key={i.href}
                    style={idx % 2 === 0 && styles.odd}
                    lineHeight={2}
                    onPress={() => appNavigate(i.href, navigation)}
                  >
                    {i.title}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </Expand>
      )}
    </View>
  )
}

Disc.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Disc)

const styles = StyleSheet.create({
  container: {
    minHeight: 146
  },
  odd: {
    backgroundColor: _.colorBg
  }
})
