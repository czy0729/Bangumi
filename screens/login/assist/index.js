/*
 * @Author: czy0729
 * @Date: 2019-08-24 17:47:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-13 21:53:51
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { observer } from 'mobx-react'
import cheerio from 'cheerio-without-node-native'
import { Text, Input, Button, KeyboardSpacer } from '@components'
import { _, userStore } from '@stores'
import { copy, getTimestamp } from '@utils'
import { withHeader } from '@utils/decorators'
import { xhrCustom, hm, t } from '@utils/fetch'
import { info } from '@utils/ui'
import { HOST, APP_ID, APP_SECRET, URL_OAUTH_REDIRECT } from '@constants'

const title = '电脑辅助登陆'
const code = `JSON.stringify({
  userAgent: navigator.userAgent,
  cookie: document.cookie
});`

export default
@withHeader({
  screen: title
})
@observer
class LoginAssist extends React.Component {
  static navigationOptions = {
    title
  }

  state = {
    result: '',
    loading: false,
    info: ''
  }

  userAgent = ''
  formhash = ''
  cookie = {
    chiiSid: '',
    chiiAuth: ''
  }
  code = ''
  accessToken = ''

  componentDidMount() {
    hm('login/assist', 'LoginAssist')
  }

  copy = () => {
    t('辅助登陆.复制')

    copy(code)
    info('已复制')
  }

  onChangeText = result => {
    this.setState({
      result
    })
  }

  submit = () => {
    const { loading, result } = this.state
    if (loading) {
      return
    }

    if (result === '') {
      info('请粘贴结果')
      return
    }

    t('辅助登陆.提交')

    this.setState({
      loading: true,
      info: '登陆请求中...'
    })

    try {
      // 去掉用户有可能复制到的头尾双引号
      let _result = result
      if (_result.indexOf('"') === 0) {
        _result = _result.substring(1)
      }
      if (_result.lastIndexOf('"') === _result.length - 1) {
        _result = _result.substring(0, _result.length - 1)
      }

      const { userAgent, cookie } = JSON.parse(_result)
      if (userAgent) {
        this.userAgent = userAgent
      } else {
        this.setState({
          loading: false,
          info: '结果中没有userAgent, 请重新输入'
        })
        return
      }

      if (cookie) {
        const matchSid = cookie.match(/chii_auth=(.+?);/)
        if (matchSid) {
          this.cookie.chiiAuth = matchSid[1]
        } else {
          this.setState({
            loading: false,
            info: '结果中没有登陆过的cookie, 请重新输入'
          })
          return
        }

        const matchAuth = cookie.match(/chii_auth=(.+?);/)
        if (matchAuth) {
          this.cookie.chiiAuth = matchAuth[1]
        } else {
          this.setState({
            loading: false,
            info: '结果中没有登陆过的cookie, 请重新输入'
          })
          return
        }
      }

      this.onLogin()
    } catch (error) {
      this.setState({
        loading: false,
        info: '结果格式有误, 请重新输入'
      })
    }
  }

  /**
   * 登陆
   */
  onLogin = async () => {
    try {
      await this.oauth()
      await this.authorize()

      const { _response } = await this.getAccessToken()
      const accessToken = JSON.parse(_response)
      userStore.updateAccessToken(accessToken)
      this.inStore()
    } catch (ex) {
      this.setState({
        loading: false,
        info: '登陆失败, 请重试或跟我反馈吧bgm38'
      })
    }
  }

  /**
   * 获取授权表单码
   */
  oauth = async () => {
    this.setState({
      info: '获取授权表单码...(1/4)'
    })

    try {
      const res = xhrCustom({
        url: `${HOST}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`,
        headers: {
          Cookie: `; chii_cookietime=2592000; chii_sid=${this.cookie.chiiSid}; chii_auth=${this.cookie.chiiAuth};`,
          'User-Agent': this.userAgent
        }
      })

      const { _response } = await res
      this.formhash = cheerio
        .load(_response)('input[name=formhash]')
        .attr('value')
      return res
    } catch (error) {
      this.setState({
        loading: false,
        info: '登陆失败, 请重试或跟我反馈吧bgm38'
      })
      return false
    }
  }

  /**
   * 授权获取code
   */
  authorize = async () => {
    this.setState({
      info: '授权中...(2/4)'
    })

    try {
      const res = xhrCustom({
        method: 'POST',
        url: `${HOST}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`,
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

      const { responseURL } = await res
      this.code = responseURL.split('=').slice(1).join('=')
      return res
    } catch (error) {
      this.setState({
        loading: false,
        info: '登陆失败, 请重试或跟我反馈吧bgm38'
      })
      return false
    }
  }

  /**
   * code获取access_token
   */
  getAccessToken = () => {
    this.setState({
      info: '授权成功, 获取token中...(3/4)'
    })

    try {
      const res = xhrCustom({
        method: 'POST',
        url: `${HOST}/oauth/access_token`,
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
      return res
    } catch (error) {
      this.setState({
        loading: false,
        info: '登陆失败, 请重试或跟我反馈吧bgm38'
      })
      return false
    }
  }

  /**
   * 入库
   */
  inStore = async () => {
    this.setState({
      info: '登陆成功, 正在请求个人信息...(4/4)'
    })

    const { navigation } = this.props
    userStore.updateUserCookie({
      cookie: `chii_cookietime=2592000; chii_sid=${this.cookie.chiiSid}; chii_auth=${this.cookie.chiiAuth}`,
      userAgent: this.userAgent,
      v: 0
    })
    await userStore.fetchUserInfo()
    await userStore.fetchUsersInfo()

    navigation.popToTop()
  }

  render() {
    const { loading, info } = this.state
    return (
      <ScrollView
        style={_.container.bg}
        contentContainerStyle={this.styles.container}
      >
        <Text type='danger' size={12}>
          此为登陆最后的手段, 流程相对较多 (其实不复杂,
          熟悉的话比正常登陆还要快和稳), 请先尝试新版和旧版登陆, 不行再试这个.
        </Text>
        <Text style={_.mt.sm} type='sub' size={12}>
          第三方登陆失败受很多因素影响, 如网络不佳、运营商劫持、手机系统特异,
          又或者碰上bgm速度不佳 (当然还有代码有bug).
        </Text>
        <Text style={_.mt.sm} type='sub' size={12}>
          本人能力有限, 部分设备无论如何都不能走通新版和旧版的登陆流程,
          若您实在很喜欢本应用, 可以尝试下面的方法 (假如还走不通, 请多尝试,
          又或者过来干我).
        </Text>
        <Text style={_.mt.lg}>1. 复制框里的代码.</Text>
        <View style={_.mt.sm}>
          <Text style={this.styles.code} size={12}>
            {code}
          </Text>
          <Text
            style={this.styles.copy}
            size={12}
            type='success'
            onPress={this.copy}
          >
            点击复制
          </Text>
        </View>
        <Text style={_.mt.md}>
          2. 使用电脑打开浏览器, 访问 {HOST} (一定要是这个域名) 并登陆.
        </Text>
        <Text style={_.mt.md}>
          3. 登陆成功后, 打开控制台 (chrome为例, window是F12, mac是⎇ + ⌘ + i),
          之后运行复制的代码.
        </Text>
        <Text style={_.mt.md}>4. 把结果复制到下面的输入框内, 提交.</Text>
        <Input
          style={_.mt.sm}
          placeholder='粘贴结果'
          multiline
          numberOfLines={6}
          returnKeyType='done'
          returnKeyLabel='登陆'
          onChangeText={this.onChangeText}
          onSubmitEditing={this.submit}
        />
        <Button
          style={_.mt.lg}
          type='main'
          shadow
          loading={loading}
          onPress={this.submit}
        >
          登陆
        </Button>
        <Text style={_.mt.md} size={12} lineHeight={16} type='sub'>
          {info}
        </Text>
        <KeyboardSpacer />
      </ScrollView>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: _.lg,
    paddingHorizontal: _.wind
  },
  code: {
    paddingVertical: _.space,
    paddingHorizontal: _.wind,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  copy: {
    position: 'absolute',
    top: _.sm,
    right: _.sm,
    padding: _.sm
  }
}))
