/*
 * @Author: czy0729
 * @Date: 2020-01-13 11:23:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-13 11:27:53
 */
import React from 'react'
import { ScrollView, Platform } from 'react-native'
import Constants from 'expo-constants'
import { Text } from '@components'
import { _ } from '@stores'
import { withHeader } from '@utils/decorators'

const title = 'DEV'

export default
@withHeader({
  screen: title
})
class DEV extends React.Component {
  static navigationOptions = {
    title
  }

  render() {
    return (
      <ScrollView
        style={this.styles.screen}
        contentContainerStyle={this.styles.container}
      >
        <Text style={this.styles.code} size={12} lineHeight={16} type='sub'>
          {JSON.stringify(Platform)}
        </Text>
        <Text
          style={[this.styles.code, _.mt.md]}
          size={12}
          lineHeight={16}
          type='sub'
        >
          {JSON.stringify(Constants)}
        </Text>
      </ScrollView>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  screen: {
    backgroundColor: _.colorBg
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: _.lg,
    paddingHorizontal: _.wind
  },
  code: {
    padding: _.wind,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
