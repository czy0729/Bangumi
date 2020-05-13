/*
 * @Author: czy0729
 * @Date: 2020-05-02 21:02:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-13 14:19:19
 */
import React from 'react'
import { ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { Iconfont, Loading } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import Rank from './rank'
import Friends from './friends'
import Blog from './blog'
import Discuss from './discuss'
import Tags from './tags'
import Store from './store'

const title = '频道'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['channel', 'Channel']
})
@observer
class Channel extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { type } = navigation.state.params
    return {
      title: `${MODEL_SUBJECT_TYPE.getTitle(type)}频道`
    }
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      element: <Iconfont size={24} name='list' color={_.colorTitle} />,
      popover: {
        data: [
          ...MODEL_SUBJECT_TYPE.data.map(item => item.title),
          '浏览器查看'
        ],
        onSelect: key => {
          t('频道.右上角菜单', {
            key
          })

          switch (key) {
            case '浏览器查看':
              open($.url)
              break
            default:
              setTimeout(() => {
                navigation.setParams({
                  title: `${key}频道`
                })
                $.toggleType(MODEL_SUBJECT_TYPE.getLabel(key))
              }, 40)
              break
          }
        }
      }
    })
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.channel
    if (!_loaded) {
      return <Loading style={_.container.screen} />
    }

    return (
      <ScrollView
        style={_.container.plain}
        contentContainerStyle={_.container.bottom}
      >
        <Rank />
        <Friends />
        <Blog />
        <Discuss />
        <Tags />
      </ScrollView>
    )
  }
}
