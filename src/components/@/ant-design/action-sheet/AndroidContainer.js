import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import Modal from '@ant-design/react-native/lib/modal/ModalView'
import { IOS } from '@constants'
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
    const { config, onAnimationEnd } = this.props
    const {
      title,
      message,
      options,
      destructiveButtonIndex,
      cancelButtonIndex
    } = config

    return (
      <WithTheme themeStyles={ActionSheetStyles} styles={this.props.styles}>
        {(styles, theme) => {
          const titleMsg = !!title && (
            <View style={styles.title} key='0'>
              <Text
                style={[
                  !IOS && {
                    fontFamily: ''
                  },
                  styles.titleText
                ]}
                textBreakStrategy='simple'
                numberOfLines={0}
              >
                {title}
              </Text>
            </View>
          )
          const content = options.map((item, index) => (
            <View
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              style={[
                cancelButtonIndex === index ? styles.cancelBtn : undefined
              ]}
            >
              <TouchableHighlight
                style={[styles.btn]}
                underlayColor={theme.fill_tap}
                onPress={() => this.confirm(index)}
              >
                <Text
                  style={[
                    !IOS && {
                      fontFamily: ''
                    },
                    destructiveButtonIndex === index
                      ? styles.destructiveBtn
                      : styles.btnText
                  ]}
                  textBreakStrategy='simple'
                  numberOfLines={0}
                >
                  {item}
                </Text>
              </TouchableHighlight>
              {cancelButtonIndex === index ? (
                <View style={styles.cancelBtnMask} />
              ) : null}
            </View>
          ))
          return (
            <View style={styles.container}>
              <Modal
                animationDuration={200}
                animateAppear
                visible={this.state.visible}
                onAnimationEnd={onAnimationEnd}
                style={styles.content}
                animationType='slide-up'
                maskClosable
                onClose={() => this.confirm(cancelButtonIndex || -1)}
              >
                <View>
                  {titleMsg}
                  {!!message && (
                    <View style={styles.message} key='1'>
                      <Text
                        style={
                          !IOS && {
                            fontFamily: ''
                          }
                        }
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
