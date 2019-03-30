/*
 * @Author: czy0729
 * @Date: 2019-03-19 01:43:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-19 03:36:17
 */
import React from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native'
import { fontSize, colorBorder, colorPlain, radiusXs } from '@styles'

const initInputHeight = 18

export default class Input extends React.Component {
  render() {
    const { style, multiline, numberOfLines = 1, ...other } = this.props

    if (multiline) {
      const containerHeight = initInputHeight * numberOfLines + 18
      return (
        <TouchableWithoutFeedback onPress={() => this.TextInput.focus()}>
          <View
            style={[styles.multiContainer, { height: containerHeight }, style]}
          >
            <TextInput
              ref={textInput => (this.TextInput = textInput)}
              style={styles.multiInput}
              multiline
              numberOfLines={numberOfLines}
              underlineColorAndroid='transparent'
              autoCorrect={false}
              {...other}
            />
          </View>
        </TouchableWithoutFeedback>
      )
    }

    return (
      <TextInput
        style={[styles.input, style]}
        numberOfLines={numberOfLines}
        underlineColorAndroid='transparent'
        autoCorrect={false}
        clearButtonMode='while-editing'
        {...other}
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 8,
    ...fontSize(14),
    backgroundColor: colorPlain,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderColor: colorBorder,
    borderRadius: radiusXs,
    overflow: 'hidden'
  },
  multiContainer: {
    width: '100%',
    padding: 8,
    backgroundColor: colorPlain,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderColor: colorBorder,
    borderRadius: radiusXs,
    overflow: 'hidden'
  },
  multiInput: {
    width: '100%',
    paddingTop: 0,
    ...fontSize(14)
  }
})
