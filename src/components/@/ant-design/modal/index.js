/*
 * @Author: czy0729
 * @Date: 2020-03-21 19:50:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-07 01:21:20
 */
import PropTypes from 'prop-types'
import React from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { WithTheme } from '@ant-design/react-native/lib/style'
import { getComponentLocale } from '@ant-design/react-native/lib/_util/getLocale'
import alert from '@ant-design/react-native/lib/modal/alert'
import zhCN from '@ant-design/react-native/lib/modal/locale/zh_CN'
import RCModal from '@ant-design/react-native/lib/modal/ModalView'
import operation from '@ant-design/react-native/lib/modal/operation'
import prompt from '@ant-design/react-native/lib/modal/prompt'
import modalStyles from '@ant-design/react-native/lib/modal/style/index'
import { Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { IOS } from '@constants'

const maxHeight = StyleSheet.create({
  maxHeight: {
    maxHeight: Dimensions.get('window').height
  }
}).maxHeight

class AntmModal extends React.Component {
  static defaultProps = {
    visible: false,
    closable: false,
    maskClosable: false,
    style: {},
    bodyStyle: {},
    animationType: 'fade',
    onClose() {},
    footer: [],
    transparent: false,
    popup: false,
    animateAppear: true,
    operation: false
  }
  static alert = alert
  static operation = operation
  static prompt = prompt

  static contextTypes = {
    antLocale: PropTypes.object
  }

  root

  onFooterLayout = e => {
    if (this.root) {
      this.root.setNativeProps({
        style: [{ paddingBottom: e.nativeEvent.layout.height }, maxHeight]
      })
    }
  }

  saveRoot = root => {
    this.root = root
  }

  render() {
    const {
      title,
      closable,
      footer,
      children,
      style,
      animateAppear,
      maskClosable,
      popup,
      transparent,
      visible,
      onClose,
      bodyStyle,
      onAnimationEnd
    } = this.props

    // tslint:disable-next-line:variable-name
    const _locale = getComponentLocale(
      this.props,
      this.context,
      'Modal',
      () => zhCN
    )

    return (
      <WithTheme styles={this.props.styles} themeStyles={modalStyles}>
        {styles => {
          let btnGroupStyle = styles.buttonGroupV
          let horizontalFlex = {}
          if (footer && footer.length === 2 && !this.props.operation) {
            btnGroupStyle = styles.buttonGroupH
            horizontalFlex = { flex: 1 }
          }
          const buttonWrapStyle =
            footer && footer.length === 2
              ? styles.buttonWrapH
              : styles.buttonWrapV
          let footerDom
          if (footer && footer.length) {
            const footerButtons = footer.map((button, i) => {
              let buttonStyle = {}
              if (this.props.operation) {
                buttonStyle = styles.buttonTextOperation
              }
              if (button.style) {
                buttonStyle = button.style
                if (typeof buttonStyle === 'string') {
                  const styleMap = {
                    cancel: {},
                    default: {},
                    destructive: { color: 'red' }
                  }
                  buttonStyle = styleMap[buttonStyle] || {}
                }
              }
              const noneBorder =
                footer && footer.length === 2 && i === 1
                  ? { borderRightWidth: 0 }
                  : {}
              const onPressFn = () => {
                if (button.onPress) {
                  button.onPress()
                }
                if (onClose) {
                  onClose()
                }
              }
              return (
                <TouchableHighlight
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  style={horizontalFlex}
                  underlayColor='#ddd'
                  onPress={onPressFn}
                >
                  <View style={[buttonWrapStyle, noneBorder]}>
                    <Text
                      style={[
                        !IOS && {
                          fontFamily: ''
                        },
                        styles.buttonText,
                        buttonStyle
                      ]}
                      textBreakStrategy='simple'
                      numberOfLines={0}
                    >
                      {button.text || `${_locale.buttonText}${i}`}
                    </Text>
                  </View>
                </TouchableHighlight>
              )
            })
            footerDom = (
              <View
                style={[btnGroupStyle, styles.footer]}
                onLayout={this.onFooterLayout}
              >
                {footerButtons}
              </View>
            )
          }

          let animType = this.props.animationType
          if (transparent) {
            if (animType === 'slide') {
              animType = 'slide-up'
            }
            const closableDom = closable ? (
              <View
                style={[
                  styles.closeWrap,
                  {
                    zIndex: 1
                  }
                ]}
              >
                <Touchable onPress={onClose}>
                  {/* <Text style={[styles.close]}>×</Text> */}
                  <Iconfont name='close' size={18} color={_.colorIcon} />
                </Touchable>
              </View>
            ) : null
            return (
              <View style={styles.container}>
                <RCModal
                  onClose={onClose}
                  animationType={animType}
                  wrapStyle={transparent ? styles.wrap : undefined}
                  style={
                    style
                      ? [styles.innerContainer, style]
                      : styles.innerContainer
                  }
                  visible={visible}
                  onAnimationEnd={onAnimationEnd}
                  animateAppear={animateAppear}
                  maskClosable={maskClosable}
                >
                  <View style={maxHeight} ref={this.saveRoot}>
                    {title ? (
                      <Text
                        style={[
                          !IOS && {
                            fontFamily: ''
                          },
                          styles.header
                        ]}
                        textBreakStrategy='simple'
                        numberOfLines={0}
                      >
                        {title}
                      </Text>
                    ) : null}
                    <View style={[styles.body, bodyStyle]}>{children}</View>
                    {footerDom}
                    {closableDom}
                  </View>
                </RCModal>
              </View>
            )
          }
          if (popup) {
            let aType = 'SlideDown'
            if (animType === 'slide-up') {
              animType = 'slide-up'
              aType = 'SlideUp'
            } else {
              animType = 'slide-down'
            }
            return (
              <View style={styles.container}>
                <RCModal
                  onClose={onClose}
                  animationType={animType}
                  // tslint:disable-next-line:jsx-no-multiline-js
                  style={[
                    styles.popupContainer,
                    styles[`popup${aType}`],
                    style
                  ]}
                  visible={visible}
                  onAnimationEnd={onAnimationEnd}
                  animateAppear={animateAppear}
                  maskClosable={maskClosable}
                >
                  <View ref={this.saveRoot} style={bodyStyle}>
                    {children}
                  </View>
                </RCModal>
              </View>
            )
          }
          if (animType === 'slide') {
            animType = undefined
          }
          return (
            <View style={styles.container}>
              <RCModal
                visible={visible}
                animationType={animType}
                onClose={onClose}
              >
                <View style={style}>{children}</View>
              </RCModal>
            </View>
          )
        }}
      </WithTheme>
    )
  }
}

export default AntmModal
