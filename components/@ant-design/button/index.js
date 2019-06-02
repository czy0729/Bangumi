import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { WithTheme } from '../style'
import buttonStyles from './style/index'

export default class Button extends React.Component {
  static defaultProps = {
    pressIn: false,
    disabled: false,
    loading: false,
    textStyle: {},

    onPress: () => {},
    onPressIn: () => {},
    onPressOut: () => {},
    onShowUnderlay: () => {},
    onHideUnderlay: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      pressIn: false,
      touchIt: false
    }
  }

  onPressIn = (...arg) => {
    this.setState({ pressIn: true })
    if (this.props.onPressIn) {
      this.props.onPressIn(...arg)
    }
  }
  onPressOut = (...arg) => {
    this.setState({ pressIn: false })
    if (this.props.onPressOut) {
      this.props.onPressOut(...arg)
    }
  }
  onShowUnderlay = (...arg) => {
    this.setState({ touchIt: true })
    if (this.props.onShowUnderlay) {
      this.props.onShowUnderlay(...arg)
    }
  }
  onHideUnderlay = (...arg) => {
    this.setState({ touchIt: false })
    if (this.props.onHideUnderlay) {
      this.props.onHideUnderlay(...arg)
    }
  }

  render() {
    // TODO: replace `TouchableHighlight` with `TouchableWithoutFeedback` in version 1.1.0
    // for using setNativeProps to improve performance
    const {
      size = 'large',
      type = 'default',
      disabled,
      activeStyle,
      onPress,
      style,
      styles,
      textStyle,
      loading,
      ...restProps
    } = this.props
    return (
      <WithTheme themeStyles={buttonStyles} styles={styles}>
        {_styles => {
          let _textStyle = [
            _styles[`${size}RawText`],
            _styles[`${type}RawText`],
            disabled && _styles[`${type}DisabledRawText`],
            this.state.pressIn && _styles[`${type}HighlightText`]
          ]
          if (Array.isArray(textStyle)) {
            _textStyle = _textStyle.concat(textStyle)
          } else {
            _textStyle.push(textStyle)
          }

          const wrapperStyle = [
            _styles.wrapperStyle,
            _styles[`${size}Raw`],
            _styles[`${type}Raw`],
            disabled && _styles[`${type}DisabledRaw`],
            this.state.pressIn && activeStyle && _styles[`${type}Highlight`],
            activeStyle && this.state.touchIt && activeStyle,
            style
          ]

          const underlayColor = StyleSheet.flatten(
            activeStyle || _styles[`${type}Highlight`]
          ).backgroundColor

          const indicatorColor = StyleSheet.flatten(
            this.state.pressIn
              ? _styles[`${type}HighlightText`]
              : _styles[`${type}RawText`]
          ).color

          return (
            <TouchableHighlight
              activeOpacity={0.4}
              {...restProps}
              style={wrapperStyle}
              disabled={disabled}
              underlayColor={underlayColor}
              onPress={e => onPress && onPress(e)}
              onPressIn={this.onPressIn}
              onPressOut={this.onPressOut}
              onShowUnderlay={this.onShowUnderlay}
              onHideUnderlay={this.onHideUnderlay}
            >
              <View style={_styles.container}>
                {loading ? (
                  // tslint:disable-next-line:jsx-no-multiline-js
                  <ActivityIndicator
                    style={_styles.indicator}
                    animating
                    color={indicatorColor}
                    size='small'
                  />
                ) : null}
                <Text style={_textStyle} allowFontScaling={false}>
                  {this.props.children}
                </Text>
              </View>
            </TouchableHighlight>
          )
        }}
      </WithTheme>
    )
  }
}
