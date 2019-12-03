/*
 * @Author: czy0729
 * @Date: 2019-07-17 09:28:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-03 16:33:47
 */
import React from 'react'
import { View, Image as RNImage } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable, Input, Button, Mesume } from '@components'
import { _ } from '@stores'

export default
@observer
class Form extends React.Component {
  static defaultProps = {
    forwardRef: Function.prototype,
    onGetCaptcha: Function.prototype,
    onFocus: Function.prototype,
    onBlur: Function.prototype,
    onChange: Function.prototype,
    onLogin: Function.prototype
  }

  render() {
    const {
      navigation,
      email,
      password,
      captcha,
      base64,
      loading,
      info,
      forwardRef,
      onGetCaptcha,
      onFocus,
      onBlur,
      onChange,
      onLogin
    } = this.props
    const isError = info.includes('错误')
    return (
      <View style={[_.container.column, this.styles.gray]}>
        <View style={this.styles.form}>
          <Flex justify='center'>
            <Mesume />
          </Flex>
          <Flex style={_.mt.md}>
            <Flex.Item>
              <Input
                style={this.styles.input}
                value={email}
                placeholder='Email'
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={evt => onChange(evt, 'email')}
              />
            </Flex.Item>
          </Flex>
          <Flex style={_.mt.md}>
            <Flex.Item>
              <Input
                style={this.styles.input}
                value={password}
                placeholder='密码'
                secureTextEntry
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={evt => onChange(evt, 'password')}
              />
            </Flex.Item>
          </Flex>
          <Flex style={_.mt.md}>
            <Flex.Item>
              <Input
                ref={forwardRef}
                style={this.styles.input}
                value={captcha}
                placeholder='验证'
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={evt => onChange(evt, 'captcha')}
              />
            </Flex.Item>
            <Touchable
              style={this.styles.captchaContainer}
              onPress={onGetCaptcha}
            >
              {!!base64 && (
                <RNImage style={this.styles.captcha} source={{ uri: base64 }} />
              )}
            </Touchable>
          </Flex>
          <Button
            style={_.mt.lg}
            type='main'
            shadow
            loading={loading}
            onPress={onLogin}
          >
            登陆
          </Button>
          <Text
            style={_.mt.md}
            size={12}
            lineHeight={16}
            type='sub'
            onPress={() => {
              if (isError) {
                navigation.push('Login')
              }
            }}
          >
            {info}
          </Text>
          {isError && (
            <Text
              style={_.mt.md}
              size={12}
              lineHeight={16}
              type='sub'
              onPress={() => navigation.push('LoginAssist')}
            >
              部分设备实在没办法走通登陆流程的, 可点击这里前往辅助登陆
              (需要使用PC) &gt;
            </Text>
          )}
        </View>
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  gray: {
    backgroundColor: _.colorBg
  },
  form: {
    width: 280,
    paddingBottom: 82
  },
  input: {
    height: 44
  },
  captchaContainer: {
    width: 118,
    height: 44,
    marginLeft: _.sm,
    backgroundColor: _.colorBg
  },
  captcha: {
    width: 118,
    height: 44
  }
}))
