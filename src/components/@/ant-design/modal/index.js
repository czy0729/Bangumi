/*
 * @Author: czy0729
 * @Date: 2020-03-21 19:50:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-04 12:20:57
 */
import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import PropTypes from 'prop-types'
import { WithTheme } from '@ant-design/react-native/lib/style'
import { getComponentLocale } from '@ant-design/react-native/lib/_util/getLocale'
import alert from '@ant-design/react-native/lib/modal/alert'
import zhCN from '@ant-design/react-native/lib/modal/locale/zh_CN'
import RCModal from '@ant-design/react-native/lib/modal/ModalView'
import operation from '@ant-design/react-native/lib/modal/operation'
import prompt from '@ant-design/react-native/lib/modal/prompt'
import modalStyles from '@ant-design/react-native/lib/modal/style/index'
import { Flex, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { IOS } from '@constants'
import { window } from '@styles'
import { BlurView } from './blur-view'
import { styles as _styles } from './styles'

const maxHeight = StyleSheet.create({
  maxHeight: {
    maxHeight: window.height
  }
}).maxHeight

class AntmModal extends React.Component {
  static defaultProps = {
    animateAppear: true,
    animationType: 'fade',
    bodyStyle: {},
    closable: false,
    footer: [],
    maskClosable: false,
    onClose() {},
    operation: false,
    popup: false,
    style: {},
    transparent: false,
    visible: false
  }
  static alert = alert
  static operation = operation
  static prompt = prompt

  static contextTypes = {
    antLocale: PropTypes.object
  }

  render() {
    const {
      animateAppear,
      blurView,
      bodyStyle,
      children,
      closable,
      footer,
      maskClosable,
      onAnimationEnd,
      onClose,
      popup,
      style,
      title,
      transparent,
      visible
    } = this.props

    const _locale = getComponentLocale(this.props, this.context, 'Modal', () => zhCN)
    return (
      <WithTheme styles={this.props.styles} themeStyles={modalStyles}>
        {styles => {
          let animType = this.props.animationType

          const closableDom = closable ? (
            <View
              style={[
                styles.closeWrap,
                {
                  zIndex: 1,
                  width: 36,
                  height: 36,
                  marginTop: -10,
                  marginLeft: -4
                }
              ]}
            >
              <Touchable
                style={{
                  borderRadius: 20,
                  overflow: 'hidden'
                }}
                onPress={onClose}
              >
                <Flex
                  style={{
                    width: 36,
                    height: 36
                  }}
                  justify='center'
                >
                  <Iconfont name='md-close' color={_.colorIcon} />
                </Flex>
              </Touchable>
            </View>
          ) : null
          const bodyDom = (
            <View style={maxHeight}>
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
              {closableDom}
            </View>
          )
          const wrapDom = children => {
            return blurView ? <BlurView>{children}</BlurView> : children
          }

          return (
            <View style={styles.container}>
              <RCModal
                style={[styles.innerContainer, style, blurView && _styles.transparent]}
                wrapStyle={transparent && styles.wrap}
                visible={visible}
                maskClosable={maskClosable}
                animationType={animType}
                animateAppear={animateAppear}
                onAnimationEnd={onAnimationEnd}
                onClose={onClose}
              >
                {wrapDom(bodyDom)}
              </RCModal>
            </View>
          )
        }}
      </WithTheme>
    )
  }
}

export default AntmModal
