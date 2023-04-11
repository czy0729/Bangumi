/*
 * @Author: czy0729
 * @Date: 2020-03-21 19:50:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 12:56:34
 */
import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { WithTheme } from '@ant-design/react-native/lib/style'
import alert from '@ant-design/react-native/lib/modal/alert'
import RCModal from '@ant-design/react-native/lib/modal/ModalView'
import operation from '@ant-design/react-native/lib/modal/operation'
import prompt from '@ant-design/react-native/lib/modal/prompt'
import modalStyles from '@ant-design/react-native/lib/modal/style/index'
import { _ } from '@stores'
import { window } from '@styles'
import { Flex } from '../../../flex'
import { Touchable } from '../../../touchable'
import { Iconfont } from '../../../iconfont'
import { BlurView } from './blur-view'
import { Wrap } from './wrap'
import { styles as overideStyles } from './styles'

const maxHeight = StyleSheet.create({
  maxHeight: {
    maxHeight: window.height
  }
}).maxHeight
const defaultProps = {
  styles: {},
  style: undefined,
  bodyStyle: undefined,
  animateAppear: true,
  animationType: 'fade' as const,
  closable: false,
  footer: [],
  maskClosable: false,
  onClose: () => {},
  onAnimationEnd: () => {},
  operation: false,
  popup: false,
  title: '' as any,
  transparent: false,
  visible: false,
  blurView: false,
  focus: false
}

class AntmModal extends React.Component<Partial<typeof defaultProps>> {
  static defaultProps = defaultProps
  static alert = alert
  static operation = operation
  static prompt = prompt
  static contextTypes = {
    antLocale: PropTypes.object
  }

  render() {
    const {
      styles,
      style,
      bodyStyle,
      animateAppear,
      animationType,
      blurView,
      children,
      closable,
      maskClosable,
      onAnimationEnd,
      onClose,
      title,
      visible,
      focus
    } = this.props
    const IOS = Platform.OS === 'ios'
    const wrapDom = (children: JSX.Element) => {
      return blurView ? <BlurView>{children}</BlurView> : children
    }
    return (
      <WithTheme styles={styles} themeStyles={modalStyles}>
        {styles => {
          return (
            <RCModal
              style={blurView ? [style, overideStyles.transparent] : style}
              wrapStyle={overideStyles.center}
              visible={visible}
              maskClosable={maskClosable}
              animationType={animationType}
              animateAppear={animateAppear}
              onAnimationEnd={onAnimationEnd}
              onClose={onClose}
            >
              <Wrap focus={focus}>
                {wrapDom(
                  <View style={maxHeight}>
                    <View style={overideStyles.title}>
                      {title && (
                        <Text
                          style={
                            IOS ? styles.header : [overideStyles.font, styles.header]
                          }
                          textBreakStrategy='simple'
                          numberOfLines={0}
                        >
                          {title}
                        </Text>
                      )}
                    </View>
                    <View style={bodyStyle ? [styles.body, bodyStyle] : styles.body}>
                      {children}
                    </View>
                    {closable && (
                      <View style={[styles.closeWrap, overideStyles.close]}>
                        <Touchable style={overideStyles.touch} onPress={onClose}>
                          <Flex style={overideStyles.btn} justify='center'>
                            <Iconfont name='md-close' color={_.colorIcon} />
                          </Flex>
                        </Touchable>
                      </View>
                    )}
                  </View>
                )}
              </Wrap>
            </RCModal>
          )
        }}
      </WithTheme>
    )
  }
}

export default AntmModal
