/* eslint-disable no-trailing-spaces */
/*
 * v2.1 为了应付多种特异的情况
 * [0]正常登陆 -> 不行 -> [1]换成http -> 不行 -> [2]withCredentials = true -> 不行 -> 失败
 * 假如最终是[1]成功登陆, 接下来所有请求html都不能带https
 * @Author: czy0729
 * @Date: 2019-06-30 15:48:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-15 16:03:28
 */
import React from 'react'
import { Alert, View } from 'react-native'
import { observer } from 'mobx-react'
import Constants from 'expo-constants'
import cheerio from 'cheerio-without-node-native'
import deepmerge from 'deepmerge'
import { StatusBarEvents, Text, Flex, KeyboardSpacer, UM } from '@components'
import { StatusBarPlaceholder } from '@screens/_'
import { _, userStore } from '@stores'
import { getTimestamp, setStorage, getStorage, open } from '@utils'
import { xhrCustom, hm, t } from '@utils/fetch'
import { info } from '@utils/ui'
import { HOST_2, APP_ID, APP_SECRET, URL_OAUTH_REDIRECT } from '@constants'
import Preview from './preview'
import Form from './form'

const title = '登陆'
const namespace = 'LoginV2'

export default
@observer
class LoginV2 extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    host: HOST_2,
    clicked: false,
    email: '',
    password: '',
    captcha: '',
    base64: '',
    loading: false,
    info: '',
    retry: 0,
    focus: false
  }

  userAgent = ''
  formhash = ''
  lastCaptcha = ''
  cookie = {
    chiiSid: '',
    chiiAuth: ''
  }
  code = ''
  accessToken = ''

  inputRef

  async componentDidMount() {
    const host = await getStorage(`${namespace}|host`)
    if (host) {
      this.setState({
        host
      })
    }

    const email = await getStorage(`${namespace}|email`)
    if (email) {
      this.setState({
        email
      })
    }

    const password = await getStorage(`${namespace}|password`)
    if (password) {
      this.setState({
        password
      })
    }

    this.reset()
    hm('login/v2', 'LoginV2')
  }

  /**
   * 游客访问
   */
  onTour = async () => {
    t('登陆.游客访问')

    try {
      info('正在从github获取游客cookie...')

      const { _response } = await xhrCustom({
        url: 'https://czy0729.github.io/Bangumi/web/tourist.json'
      })
      const { accessToken, userCookie } = JSON.parse(_response)
      userStore.updateAccessToken(accessToken)

      const { navigation } = this.props
      userStore.updateUserCookie({
        cookie: userCookie.cookie,
        userAgent: userCookie.userAgent,
        v: 0,
        tourist: 1
      })

      info('登陆成功, 正在请求个人信息...', 6)
      await userStore.fetchUserInfo()
      await userStore.fetchUsersInfo()
      navigation.popToTop()
    } catch (error) {
      info('登陆状态过期, 请稍后再试')
    }
  }

  /**
   * 显示登陆表单
   */
  onPreviewLogin = () =>
    this.setState({
      clicked: true
    })

  /**
   * 随机生成一个UserAgent
   */
  getUA = async () => {
    const res = Constants.getWebViewUserAgentAsync()
    const UA = await res
    this.userAgent = `${UA} ${getTimestamp()}`

    return res
  }

  /**
   * 获取表单hash
   */
  getFormHash = async () => {
    const { host } = this.state
    const res = xhrCustom({
      url: `${host}/login`,
      headers: {
        // Cookie: '; chii_cookietime=2592000;',
        'User-Agent': this.userAgent
      }
    })

    const { responseHeaders, _response } = await res
    if (responseHeaders['Set-Cookie']) {
      const match = responseHeaders['Set-Cookie'].match(/chii_sid=(.+?);/)
      if (match) {
        this.cookie.chiiSid = match[1]
      }
    }

    const match = _response.match(
      /<input type="hidden" name="formhash" value="(.+?)">/
    )
    if (match) {
      this.formhash = match[1]
    }

    return res
  }

  /**
   * 获取验证码
   */
  getCaptcha = async () => {
    this.setState({
      base64: ''
    })

    const { host } = this.state
    const res = xhrCustom({
      url: `${host}/signup/captcha`,
      headers: {
        Cookie: `; chii_sid=${this.cookie.chiiSid};`,
        'User-Agent': this.userAgent
      },
      responseType: 'arraybuffer'
    })

    const { _response } = await res
    this.setState({
      base64: `data:image/gif;base64,${_response}`
    })

    return res
  }

  /**
   * 构造再登陆请求数据
   */
  getRetryData = data => {
    const { retry } = this.state
    if (retry <= 1) {
      return data
    }

    const _data = deepmerge({}, data)
    if (retry === 2) {
      _data.withCredentials = true
    }
    return _data
  }

  /**
   * 尝试再登陆
   */
  retryLogin = info => {
    this.finalLoginFail(info)

    // @todo 有问题, 待处理
    // const { retry } = this.state
    // if (retry <= 2) {
    //   this.setState(
    //     {
    //       retry: retry + 1
    //     },
    //     () => {
    //       this.login()
    //     }
    //   )
    // } else {
    //   this.finalLoginFail(info)
    // }
  }

  /**
   * 登陆最终失败
   */
  finalLoginFail = async info => {
    t('登陆.错误')

    this.setState({
      loading: false,
      info,
      retry: 0
    })
    this.reset()
  }

  /**
   * 登陆流程
   */
  onLogin = async () => {
    const { email, password, captcha } = this.state
    if (!email || !password || !captcha) {
      info('请填写以上字段')
      return
    }

    t('登陆.登陆')

    this.inputRef.inputRef.blur()
    setStorage(`${namespace}|email`, email)

    try {
      if (this.lastCaptcha !== captcha) {
        await this.login()
        if (!this.cookie.chiiAuth) {
          this.retryLogin('验证码或密码错误, 重试或前往旧版授权登陆 >')
          return
        }

        // 缓存上次的正确的验证码
        this.lastCaptcha = captcha

        await this.oauth()
        await this.authorize()
      } else {
        info('重试 (4/5)')
      }

      const { _response } = await this.getAccessToken()
      const accessToken = JSON.parse(_response)
      userStore.updateAccessToken(accessToken)
      setStorage(`${namespace}|password`, password)
      this.inStore()
    } catch (ex) {
      this.retryLogin('登陆失败, 请重试或点击这里前往旧版授权登陆 >')
    }
  }

  /**
   * 密码登陆
   */
  login = async () => {
    this.setState({
      loading: true,
      info: `${this.retryText}登陆请求中...(1/5)`
    })

    const { host, email, password, captcha } = this.state
    const res = xhrCustom(
      this.getRetryData({
        method: 'POST',
        url: `${host}/FollowTheRabbit`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Cookie: `; chii_sid=${this.cookie.chiiSid};`,
          'User-Agent': this.userAgent
        },
        data: {
          formhash: this.formhash,
          referer: '',
          dreferer: '',
          email,
          password,
          captcha_challenge_field: captcha,
          loginsubmit: '登陆'
        }
      })
    )

    const data = await res
    const { _response, responseHeaders } = data
    if (_response.includes('分钟内您将不能登录本站。')) {
      info('累计 5 次错误尝试，15 分钟内您将不能登录本站。')
    }

    if (responseHeaders['Set-Cookie']) {
      const match = responseHeaders['Set-Cookie'].match(/chii_auth=(.+?);/)
      if (match) {
        this.cookie.chiiAuth = match[1]
      }
    }

    return res
  }

  /**
   * 获取授权表单码
   */
  oauth = async () => {
    this.setState({
      info: `${this.retryText}获取授权表单码...(2/5)`
    })

    const { host } = this.state
    const res = xhrCustom(
      this.getRetryData({
        url: `${host}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`,
        headers: {
          Cookie: `; chii_cookietime=2592000; chii_sid=${this.cookie.chiiSid}; chii_auth=${this.cookie.chiiAuth};`,
          'User-Agent': this.userAgent
        }
      })
    )

    const { _response } = await res
    this.formhash = cheerio
      .load(_response)('input[name=formhash]')
      .attr('value')

    return res
  }

  /**
   * 授权获取code
   */
  authorize = async () => {
    this.setState({
      info: `${this.retryText}授权中...(3/5)`
    })

    const { host } = this.state
    const res = xhrCustom(
      this.getRetryData({
        method: 'POST',
        url: `${host}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Cookie: `; chii_cookietime=2592000; chii_sid=${this.cookie.chiiSid}; chii_auth=${this.cookie.chiiAuth};`,
          'User-Agent': this.userAgent
        },
        data: {
          formhash: this.formhash,
          redirect_uri: '',
          client_id: APP_ID,
          submit: '授权'
        }
      })
    )

    const { responseURL } = await res
    this.code = responseURL
      .split('=')
      .slice(1)
      .join('=')

    return res
  }

  /**
   * code获取access_token
   */
  getAccessToken = () => {
    this.setState({
      info: `${this.retryText}授权成功, 获取token中...(4/5), 持续时间过长可直接再次点击登陆重试`
    })

    const { host } = this.state
    return xhrCustom(
      this.getRetryData({
        method: 'POST',
        url: `${host}/oauth/access_token`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': this.userAgent
        },
        data: {
          grant_type: 'authorization_code',
          client_id: APP_ID,
          client_secret: APP_SECRET,
          code: this.code,
          redirect_uri: URL_OAUTH_REDIRECT,
          state: getTimestamp()
        }
      })
    )
  }

  /**
   * 入库
   */
  inStore = async () => {
    this.setState({
      info: `${this.retryText}登陆成功, 正在请求个人信息...(5/5)`
    })

    const { navigation } = this.props
    const { retry } = this.state
    userStore.updateUserCookie({
      cookie: `chii_sid=${this.cookie.chiiSid}; chii_auth=${this.cookie.chiiAuth};`,
      userAgent: this.userAgent,
      v: retry // retry约定用于标记登陆版本
    })

    await userStore.fetchUserInfo()
    await userStore.fetchUsersInfo()
    navigation.popToTop()

    t('登陆.成功')
  }

  reset = async () => {
    this.setState({
      base64: ''
    })

    await this.getUA()
    await this.getFormHash()
    await this.getCaptcha()
  }

  onFocus = () =>
    this.setState({
      focus: true
    })

  onBlur = () =>
    this.setState({
      focus: false
    })

  /**
   * 输入框变化
   */
  onChange = (evt, type) => {
    const { nativeEvent } = evt
    const { text } = nativeEvent
    this.setState({
      [type]: text,
      info: ''
    })
  }

  /**
   * 切换登陆域名
   */
  onSelect = host => {
    setStorage(`${namespace}|host`, host)
    this.setState(
      {
        host
      },
      () => {
        t('登陆.切换域名', {
          host
        })

        this.reset()
      }
    )
  }

  /**
   * 重试登陆文案
   */
  get retryText() {
    const { retry } = this.state
    if (!retry) {
      return ''
    }
    return `第${retry}次重试, `
  }

  renderPreview() {
    return (
      <Preview
        onLogin={this.onPreviewLogin}
        onTour={() =>
          Alert.alert(
            '提示',
            '将使用开发者的测试账号, 提供大部分功能预览, 确定登陆? (可以在设置里面退出登陆)',
            [
              {
                text: '取消',
                style: 'cancel'
              },
              {
                text: '确定',
                onPress: this.onTour
              }
            ]
          )
        }
      />
    )
  }

  renderForm() {
    const { navigation } = this.props
    const { host, email, password, captcha, base64, loading, info } = this.state
    return (
      <Form
        forwardRef={ref => (this.inputRef = ref)}
        navigation={navigation}
        email={email}
        password={password}
        captcha={captcha}
        base64={base64}
        loading={loading}
        info={info}
        host={host}
        onGetCaptcha={this.getCaptcha}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onChange={this.onChange}
        onSelect={this.onSelect}
        onLogin={this.onLogin}
      />
    )
  }

  render() {
    const { clicked, focus } = this.state
    return (
      <View style={this.styles.container}>
        <UM screen={title} />
        <StatusBarEvents backgroundColor={_.colorBg} />
        <StatusBarPlaceholder style={this.styles.gray} />
        <View style={_.container.flex}>
          {clicked ? this.renderForm() : this.renderPreview()}
        </View>
        {clicked ? (
          !focus && (
            <View style={this.styles.ps}>
              <Text size={12} lineHeight={14} type='sub'>
                隐私策略: 我们十分尊重您的隐私, 我们不会收集上述信息.
                (多次登陆失败后可能一段时间内不能再次登陆)
              </Text>
            </View>
          )
        ) : (
          <Flex style={this.styles.old}>
            <Flex.Item>
              <Text
                type='sub'
                align='center'
                onPress={() => {
                  t('登陆.跳转', {
                    to: 'Signup'
                  })
                  Alert.alert(
                    '温馨提示',
                    // eslint-disable-next-line max-len
                    '在移动端浏览器注册会经常遇到验证码错误，若碰到建议在浏览器里使用电脑版UA，不行就使用电脑浏览器，再不行使用电脑Chrome注册(这个一定可以)。 \n\n注册后会有激活码发到邮箱，短时间内只会发送一次，反正一直用邮箱那个就行。输入激活码有可能激活失败，主要是之前太多人注册进来打广告，站主写了很多限制。若激活不能再换一个不同的电脑浏览器，比如IE或者Safari激活。',
                    [
                      {
                        text: '取消',
                        type: 'cancel'
                      },
                      {
                        text: '前往注册',
                        onPress: () => open('https://bgm.tv/signup')
                      }
                    ]
                  )
                }}
              >
                注册
              </Text>
            </Flex.Item>
            <Flex.Item style={this.styles.border}>
              <Text
                type='sub'
                align='center'
                onPress={() => {
                  t('登陆.跳转', {
                    to: 'Login'
                  })

                  const { navigation } = this.props
                  navigation.push('Login')
                }}
              >
                旧版登陆
              </Text>
            </Flex.Item>
            <Flex.Item style={this.styles.border}>
              <Text
                type='sub'
                align='center'
                onPress={() => {
                  t('登陆.跳转', {
                    to: 'LoginAssist'
                  })

                  const { navigation } = this.props
                  navigation.push('LoginAssist')
                }}
              >
                辅助登陆
              </Text>
            </Flex.Item>
          </Flex>
        )}
        <KeyboardSpacer />
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    flex: 1,
    paddingBottom: _.lg,
    backgroundColor: _.colorBg
  },
  gray: {
    backgroundColor: _.colorBg
  },
  old: {
    position: 'absolute',
    zIndex: 1,
    bottom: _.bottom,
    left: _.wind,
    right: _.wind,
    padding: _.sm
  },
  ps: {
    position: 'absolute',
    right: _.wind * 2,
    bottom: _.bottom,
    left: _.wind * 2
  },
  border: {
    borderLeftWidth: 1,
    borderColor: _.colorBorder
  }
}))
