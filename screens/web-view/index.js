/*
 * @Author: czy0729
 * @Date: 2019-05-19 22:56:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-20 02:46:51
 */
import React from 'react'
import { HOST_NAME } from '@constants'
import { Loading, WebView as CompWebView } from '@components'
import { IconBack } from '@screens/_'
import { observer } from '@utils/decorators'
import { info } from '@utils/ui'
import { userStore } from '@stores'
import _ from '@styles'

export default
@observer
class WebView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title') || HOST_NAME,
    headerLeft: <IconBack navigation={navigation} color={_.colorTitle} />
  })

  onError = () => {
    const { navigation } = this.props
    info('网络似乎出了点问题')
    navigation.goBack()
  }

  onMessage = async event => {
    const { type, data } = JSON.parse(event.nativeEvent.data)
    console.log(type, data)
  }

  render() {
    const { navigation } = this.props
    const uri = navigation.getParam('uri')
    const { cookie } = userStore.userCookie
    return (
      <CompWebView
        style={_.container.flex}
        uri={uri}
        useWebKit={false}
        renderLoading={() => <Loading color={_.colorMain} />}
        injectedJavaScript={`(function(){
          document.cookie = '${cookie}';
        }())`}
        onError={this.onError}
        onMessage={this.onMessage}
      />
    )
  }
}
