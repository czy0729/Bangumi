/*
 * @Author: czy0729
 * @Date: 2019-07-17 09:28:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-15 15:50:39
 */
import React from 'react'
import { View, Image as RNImage } from 'react-native'
import { observer } from 'mobx-react'
import { ActivityIndicator } from '@ant-design/react-native'
import {
  Flex,
  Text,
  Touchable,
  Input,
  Button,
  Mesume,
  Iconfont
} from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { HOST, HOST_2, HOST_3 } from '@constants'

const data = [HOST, HOST_2, HOST_3]

export default
@observer
class Form extends React.Component {
  static defaultProps = {
    forwardRef: Function.prototype,
    host: '',
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
      host,
      forwardRef,
      onGetCaptcha,
      onFocus,
      onBlur,
      onChange,
      onSelect,
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
            <Touchable onPress={onGetCaptcha}>
              <Flex style={this.styles.captchaContainer} justify='center'>
                {base64 ? (
                  <RNImage
                    style={this.styles.captcha}
                    source={{ uri: base64 }}
                  />
                ) : (
                  <ActivityIndicator size='small' />
                )}
              </Flex>
            </Touchable>
          </Flex>
          <Popover data={data} onSelect={onSelect}>
            <Flex style={this.styles.popover}>
              <Flex.Item>
                <Text type='sub' size={12}>
                  使用 {host} 进行登陆
                </Text>
              </Flex.Item>
              <Iconfont name='down' type='sub' size={12} />
            </Flex>
          </Popover>
          <Button
            style={_.mt.md}
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
              可以尝试切换另一个域名进行登陆. 登陆受到网络供应商影响,
              请尝试切换wifi或4g网络, 部分设备实在没办法走通登陆流程的,
              可点击这里前往辅助登陆 (需要使用PC) &gt;
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
    width: 320,
    paddingBottom: 82
  },
  input: {
    height: 44
  },
  captchaContainer: {
    width: 118,
    height: 44,
    marginLeft: _.sm,
    backgroundColor: _.colorBg,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  captcha: {
    width: 118,
    height: 44
  },
  popover: {
    paddingTop: _.md,
    paddingBottom: _.md
  }
}))
