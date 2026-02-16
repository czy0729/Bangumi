/*
 * @Author: czy0729
 * @Date: 2020-03-21 19:50:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-23 14:13:26
 */
import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import alert from '@ant-design/react-native/lib/modal/alert'
import RCModal from '@ant-design/react-native/lib/modal/ModalView'
import operation from '@ant-design/react-native/lib/modal/operation'
import prompt from '@ant-design/react-native/lib/modal/prompt'
import modalStyles from '@ant-design/react-native/lib/modal/style/index'
import { WithTheme } from '@ant-design/react-native/lib/style'
import { syncThemeStore } from '@utils/async'
import { stl } from '@utils/utils'
import { window } from '@styles'
import { Flex } from '../../../flex'
import { Iconfont } from '../../../iconfont'
import { Touchable } from '../../../touchable'
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
  focus: false,
  children: null
}

class AntmModal extends React.Component<typeof defaultProps> {
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
      closable,
      maskClosable,
      onAnimationEnd,
      onClose,
      title,
      visible,
      focus,
      children
    } = this.props
    const _ = syncThemeStore()
    const IOS = Platform.OS === 'ios'
    return (
      <WithTheme styles={styles} themeStyles={modalStyles}>
        {styles => (
          // @ts-expect-error
          <RCModal
            style={stl(style, overideStyles.transparent)}
            wrapStyle={overideStyles.center}
            visible={visible}
            maskClosable={maskClosable}
            animationType={animationType}
            animateAppear={animateAppear}
            onAnimationEnd={onAnimationEnd}
            onClose={onClose}
          >
            <Wrap focus={focus}>
              <BlurView>
                <View style={maxHeight}>
                  <View style={overideStyles.title}>
                    {title && (
                      <Text
                        style={stl(!IOS && overideStyles.font, styles.header)}
                        textBreakStrategy='simple'
                        numberOfLines={0}
                      >
                        {title}
                      </Text>
                    )}
                  </View>
                  <View style={stl(styles.body, bodyStyle)}>{children}</View>
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
              </BlurView>
            </Wrap>
          </RCModal>
        )}
      </WithTheme>
    )
  }
}

export default AntmModal
