/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-27 17:18:58
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { Loading, Flex, Touchable, Image } from '@components'
import { IconTabBar, StatusBarPlaceholder } from '@screens/_'
import { inject, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import _ from '@styles'
import Award from './award'
import Section from './section'
import List from './list'
import Store from './store'

const title = '聚合发现'

export default
@inject(Store)
@observer
class Discovery extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <IconTabBar name='home' color={tintColor} />
    ),
    tabBarLabel: '发现'
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()

    hm('discovery', title)
  }

  render() {
    const { $, navigation } = this.context
    const { _loaded } = $.home
    if (!_loaded) {
      return <Loading style={_.container.screen} />
    }

    return (
      <ScrollView
        style={_.container.screen}
        contentContainerStyle={_.container.bottom}
      >
        <StatusBarPlaceholder style={{ backgroundColor: _.colorBg }} />
        <Award />
        <Section />
        <View style={[_.container.wind, _.mt.lg]}>
          <Touchable onPress={() => navigation.push('Anitama')}>
            <Flex
              style={{
                height: 160,
                backgroundColor: '#000',
                borderRadius: _.radiusMd,
                overflow: 'hidden'
              }}
              justify='center'
            >
              <Image
                src={require('@assets/images/anitama.jpg')}
                size={80}
                placeholder={false}
              />
            </Flex>
          </Touchable>
        </View>
        <View style={_.mt.sm}>
          {MODEL_SUBJECT_TYPE.data.map(item => (
            <List key={item.label} type={item.label} />
          ))}
        </View>
      </ScrollView>
    )
  }
}
