/*
 * @Author: czy0729
 * @Date: 2019-07-17 09:28:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 20:59:20
 */
import React from 'react'
import { Alert, View, Image as RNImage } from 'react-native'
import { ActivityIndicator } from '@ant-design/react-native'
import {
  Flex,
  Text,
  Touchable,
  Input,
  Button,
  Mesume,
  Iconfont,
  Heatmap
} from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST, HOST_2, HOST_3 } from '@constants'

const data = [HOST, HOST_2, HOST_3]

export default
@ob
class Form extends React.Component {
  static defaultProps = {
    host: '',
    forwardRef: Function.prototype,
    onGetCaptcha: Function.prototype,
    onFocus: Function.prototype,
    onBlur: Function.prototype,
    onChange: Function.prototype,
    onSelect: Function.prototype,
    onUAChange: Function.prototype,
    onLogin: Function.prototype
  }

  state = {
    config: false
  }

  componentDidMount() {
    const { email, password, captcha } = this.props
    if (email && password && !captcha) {
      this.codeRef.inputRef.focus()
    }
  }

  passwordRef
  codeRef

  showConfig = () =>
    this.setState({
      config: true
    })

  onNoticeHost = () => {
    t('登陆.配置提示', {
      name: 'host'
    })

    Alert.alert(
      '提示',
      '三个选项都是同一个站点的不同域名，只是具体服务器位置不同。 \n\n登陆建议优先使用 bangumi.tv，出现问题再尝试 chii.in，最后尝试 bgm.tv。',
      [
        {
          text: '知道了'
        }
      ]
    )
  }

  onNoticeUA = () => {
    t('登陆.配置提示', {
      name: 'ua'
    })

    Alert.alert(
      '提示',
      '假如您频繁掉登陆，不妨试试把这个选项勾上，通常登录状态生存时间为7天。 \n\n这是个不稳定的选项，若登陆正常不建议勾上，可能会遇到预测不能的状况。',
      [
        {
          text: '知道了'
        }
      ]
    )
  }

  renderForm() {
    const {
      email,
      password,
      captcha,
      base64,
      forwardRef,
      onGetCaptcha,
      onFocus,
      onBlur,
      onChange,
      onLogin
    } = this.props
    return (
      <>
        <Flex style={_.mt.lg}>
          <Flex.Item>
            <Input
              style={this.styles.input}
              value={email}
              placeholder='Email'
              returnKeyType='next'
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={evt => onChange(evt, 'email')}
              onSubmitEditing={() => this.passwordRef.inputRef.focus()}
            />
          </Flex.Item>
        </Flex>
        <Flex style={_.mt.md}>
          <Flex.Item>
            <Input
              ref={ref => (this.passwordRef = ref)}
              style={this.styles.input}
              value={password}
              placeholder='密码'
              secureTextEntry
              returnKeyType='next'
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={evt => onChange(evt, 'password')}
              onSubmitEditing={() => this.codeRef.inputRef.focus()}
            />
          </Flex.Item>
        </Flex>
        <Flex style={_.mt.md}>
          <Flex.Item>
            <Input
              ref={ref => {
                forwardRef(ref)
                this.codeRef = ref
              }}
              style={this.styles.input}
              value={captcha}
              placeholder='验证码'
              returnKeyType='done'
              returnKeyLabel='登陆'
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={evt => onChange(evt, 'captcha')}
              onSubmitEditing={onLogin}
            />
          </Flex.Item>
          <Touchable onPress={onGetCaptcha}>
            <Flex style={this.styles.captchaContainer} justify='center'>
              {base64 ? (
                <RNImage
                  style={this.styles.captcha}
                  source={{
                    uri: base64
                  }}
                />
              ) : (
                <ActivityIndicator size='small' />
              )}
            </Flex>
          </Touchable>
        </Flex>
      </>
    )
  }

  renderConfig() {
    const { isCommonUA, host, onSelect, onUAChange } = this.props
    const { config } = this.state
    if (!config) {
      return (
        <Touchable style={_.mt.sm} onPress={this.showConfig}>
          <Flex style={this.styles.touch}>
            <Text type='sub' size={12}>
              登陆配置
            </Text>
            <Iconfont style={_.ml.sm} name='right' size={12} />
          </Flex>
          <Heatmap id='登陆.切换域名' />
          <Heatmap bottom={-32} id='登陆.配置提示' transparent />
        </Touchable>
      )
    }

    return (
      <>
        <Popover style={_.mt.sm} data={data} onSelect={onSelect}>
          <Flex style={this.styles.touch}>
            <Flex.Item>
              <Flex>
                <Text type='sub' size={12}>
                  使用 {host} 进行登陆
                </Text>
                <Iconfont style={_.ml.xs} name='down' size={12} />
              </Flex>
            </Flex.Item>
            <Touchable
              style={[this.styles.touch, _.ml.md]}
              onPress={this.onNoticeHost}
            >
              <Iconfont name='information' type='sub' size={15} />
            </Touchable>
          </Flex>
        </Popover>
        <Flex>
          <Flex.Item>
            <Touchable onPress={onUAChange}>
              <Flex style={this.styles.touch}>
                <Iconfont
                  name={isCommonUA ? 'radio-select' : 'radio'}
                  color={isCommonUA ? _.colorMain : _.colorSub}
                  size={12}
                />
                <Text style={_.ml.xs} type='sub' size={12}>
                  使用固定UA登陆 (频繁掉线请勾选)
                </Text>
              </Flex>
            </Touchable>
          </Flex.Item>
          <Touchable
            style={[this.styles.touch, _.ml.md]}
            onPress={this.onNoticeUA}
          >
            <Iconfont name='information' type='sub' size={15} />
          </Touchable>
        </Flex>
      </>
    )
  }

  renderError() {
    const { navigation, info } = this.props
    const isError = info.includes('错误')
    return (
      <>
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
            请尝试切换另一域名进行重试，或尝试切换wifi或4g网络，实在没法登陆，可点击这里前往辅助登陆
            →
          </Text>
        )}
      </>
    )
  }

  render() {
    const { loading, onLogin } = this.props
    return (
      <View style={_.container.column}>
        <View style={this.styles.form}>
          <Flex justify='center'>
            <Mesume />
          </Flex>
          {this.renderForm()}
          {this.renderConfig()}
          <Button
            style={_.mt.lg}
            type='main'
            shadow
            loading={loading}
            onPress={onLogin}
          >
            登陆
          </Button>
          {this.renderError()}
        </View>
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  form: {
    width: 300,
    paddingBottom: 96
  },
  input: {
    height: 44,
    backgroundColor: _.colorBg
  },
  captchaContainer: {
    width: 118,
    height: 44,
    marginLeft: _.sm,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  captcha: {
    width: 118,
    height: 44
  },
  touch: {
    paddingVertical: 6
  }
}))
