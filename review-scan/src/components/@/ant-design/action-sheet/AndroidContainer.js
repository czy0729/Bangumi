/*
 * @Author: czy0729
 * @Date: 2023-08-10 19:45:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-07 15:24:46
 */
import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import Modal from '@ant-design/react-native/lib/modal/ModalView'
import { IOS } from '@constants/constants'
import { syncThemeStore } from '@utils/async'
import { androidTextFixedStyle } from '@styles'
import { WithTheme } from '../style'
import ActionSheetStyles from './style/index'

class ActionSheetAndroid extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.visible || false
    }
  }

  confirm(index) {
    const { callback } = this.props
    if (callback) {
      callback(index)
    }
    this.setState({
      visible: false
    })
  }
  close = () => {
    this.setState({
      visible: false
    })
  }
  render() {
    const _ = syncThemeStore()
    const { config, onAnimationEnd } = this.props
    const { title, message, options, destructiveButtonIndex, cancelButtonIndex } = config

    return (
      <WithTheme themeStyles={ActionSheetStyles} styles={this.props.styles}>
        {styles => {
          const elTitle = !!title && (
            <View style={styles.title} key='0'>
              <Text
                style={IOS ? styles.titleText : [androidTextFixedStyle, styles.titleText]}
                textBreakStrategy='simple'
                numberOfLines={0}
              >
                {title}
              </Text>
            </View>
          )

          const content = options.map((item, index) => (
            <View key={index} style={cancelButtonIndex === index && styles.cancelBtn}>
              <TouchableHighlight
                style={[
                  styles.btn,
                  {
                    paddingVertical: 12,
                    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2),
                    borderTopWidth: index ? _.hairlineWidth : 0,
                    borderTopColor: _.select('rgba(0, 0, 0, 0.12)', 'rgba(255, 255, 255, 0.12)')
                  }
                ]}
                underlayColor={_.select(_.colorBg, _._colorDarkModeLevel1)}
                onPress={() => this.confirm(index)}
              >
                <Text
                  style={[
                    !IOS && androidTextFixedStyle,
                    destructiveButtonIndex === index ? styles.destructiveBtn : styles.btnText,
                    {
                      color: _.colorDesc
                    }
                  ]}
                  textBreakStrategy='simple'
                  numberOfLines={0}
                >
                  {item}
                </Text>
              </TouchableHighlight>
              {cancelButtonIndex === index ? <View style={styles.cancelBtnMask} /> : null}
            </View>
          ))

          return (
            <View style={styles.container}>
              <Modal
                animationDuration={200}
                animateAppear
                visible={this.state.visible}
                onAnimationEnd={onAnimationEnd}
                style={[
                  styles.content,
                  {
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: _.radiusMd
                  }
                ]}
                animationType='slide-up'
                maskClosable
                onClose={() => this.confirm(cancelButtonIndex || -1)}
              >
                <View>
                  {elTitle}
                  {!!message && (
                    <View style={styles.message} key='1'>
                      <Text
                        style={!IOS && androidTextFixedStyle}
                        textBreakStrategy='simple'
                        numberOfLines={0}
                      >
                        {message}
                      </Text>
                    </View>
                  )}
                  <View>{content}</View>
                </View>
              </Modal>
            </View>
          )
        }}
      </WithTheme>
    )
  }
}

export default ActionSheetAndroid
