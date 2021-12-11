/*
 * @Author: czy0729
 * @Date: 2019-07-17 09:28:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-11 15:53:26
 */
import React from 'react'
import { Alert, View, Image as RNImage } from 'react-native'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
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
    t('登录.配置提示', {
      name: 'host'
    })

    Alert.alert(
      '提示',
      '三个选项都是同一个站点的不同域名，只是具体服务器位置不同。 \n\n登录建议优先使用 bangumi.tv，出现问题再尝试 chii.in，最后尝试 bgm.tv。',
      [
        {
          text: '知道了'
        }
      ]
    )
  }

  onNoticeUA = () => {
    t('登录.配置提示', {
      name: 'ua'
    })

    Alert.alert(
      '提示',
      '假如您频繁掉登录，不妨试试把这个选项勾上，通常登录状态生存时间为7天。 \n\n这是个不稳定的选项，若登录正常不建议勾上，可能会遇到预测不能的状况。',
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
              returnKeyLabel='登录'
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={evt => onChange(evt, 'captcha')}
              onSubmitEditing={onLogin}
            />
          </Flex.Item>
          <Touchable style={this.styles.touchCaptcha} onPress={onGetCaptcha}>
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
        <Touchable style={[this.styles.touch, _.mt.sm]} onPress={this.showConfig}>
          <Flex style={this.styles.content}>
            <Text type='sub' size={12}>
              登录配置
            </Text>
            <Iconfont name='md-navigate-next' />
          </Flex>
          <Heatmap id='登录.切换域名' />
          <Heatmap bottom={-32} id='登录.配置提示' transparent />
        </Touchable>
      )
    }

    return (
      <>
        <Flex style={[this.styles.touch, _.mt.sm]}>
          <Flex.Item>
            <Popover style={this.styles.touch} data={data} onSelect={onSelect}>
              <Flex style={this.styles.content}>
                <Text type='sub' size={12}>
                  使用 {host} 进行登录
                </Text>
                <Iconfont name='md-keyboard-arrow-down' />
              </Flex>
            </Popover>
          </Flex.Item>
          <Touchable style={this.styles.touchIcon} onPress={this.onNoticeHost}>
            <Flex style={this.styles.icon} justify='center'>
              <Iconfont name='md-info-outline' type='sub' size={18} />
            </Flex>
          </Touchable>
        </Flex>
        <Flex style={this.styles.touch}>
          <Flex.Item>
            <Touchable style={this.styles.touch} onPress={onUAChange}>
              <Flex style={this.styles.content}>
                <Iconfont
                  name={isCommonUA ? 'md-radio-button-on' : 'md-radio-button-off'}
                  color={isCommonUA ? _.colorMain : _.colorSub}
                  size={18}
                />
                <Text style={_.ml.xs} type='sub' size={12}>
                  使用固定UA登录 (频繁掉线请勾选)
                </Text>
              </Flex>
            </Touchable>
          </Flex.Item>
          <Touchable style={this.styles.touchIcon} onPress={this.onNoticeUA}>
            <Flex style={this.styles.icon} justify='center'>
              <Iconfont name='md-info-outline' type='sub' size={18} />
            </Flex>
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
            请尝试切换另一域名进行重试，或尝试切换wifi或4g网络，实在没法登录，可点击这里前往辅助登录
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
            登录
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

const memoStyles = _.memoStyles(() => ({
  form: {
    width: 300 * _.ratio,
    paddingBottom: 96
  },
  input: {
    height: _.device(44, 38) * _.ratio,
    paddingHorizontal: _.device(_.sm, _.md),
    ..._.device(_.fontSize12, _.fontSize15),
    backgroundColor: _.colorBg
  },
  touchCaptcha: {
    marginLeft: _.sm,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  captchaContainer: {
    width: 118 * _.ratio,
    height: _.device(40, 36) * _.ratio
  },
  captcha: {
    width: 118 * _.ratio,
    height: _.device(40, 36) * _.ratio
  },
  touch: {
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  content: {
    paddingVertical: 4
  },
  touchIcon: {
    marginLeft: _.md,
    borderRadius: 20,
    overflow: 'hidden'
  },
  icon: {
    width: 36,
    height: 36
  }
}))
