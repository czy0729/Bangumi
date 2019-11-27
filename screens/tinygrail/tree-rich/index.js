/*
 * @Author: czy0729
 * @Date: 2019-11-27 21:50:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-27 22:42:34
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Loading, Text } from '@components'
import { IconHeader } from '@screens/_'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { info } from '@utils/ui'
import _ from '@styles'
import StatusBarEvents from '../_/status-bar-events'
import { headerStyle, colorContainer, colorText } from '../styles'
import ToolBar from './tool-bar'
import Chart from './chart'
import Store from './store'

const title = '前百首富'

export default
@inject(Store)
@withHeader({
  screen: title,
  ...headerStyle
})
@observer
class TinygrailTree extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()

    this.setParams()
    hm('tinygrail/tree-rich', 'TinygrailTreeRich')
  }

  setParams = () => {
    const { navigation } = this.context
    const params = {
      title,
      extra: (
        <IconHeader name='refresh' color={colorText} onPress={this.onRefresh} />
      )
    }
    navigation.setParams(params)
  }

  onRefresh = async () => {
    const { $, navigation } = this.context
    navigation.setParams({
      extra: (
        <Text
          style={[
            _.mr.sm,
            {
              color: colorText
            }
          ]}
          size={12}
        >
          请求中...
        </Text>
      )
    })

    await $.fetchRich()
    info('已刷新')
    this.setParams()
  }

  onShowMenu = ({ id, name, title }) => {
    if (!id) {
      return
    }

    const { $, navigation } = this.context
    switch (title) {
      case '资产分析':
        navigation.push('TinygrailTree', {
          userName: id,
          name
        })
        return
      case '隐藏':
        $.onToggleItem({
          id,
          name
        })
        return
      default:
        navigation.push('Zone', {
          userId: id
        })
    }
  }

  render() {
    const { $ } = this.context
    const { loading, caculateType, data } = $.state
    return (
      <View style={styles.container}>
        <StatusBarEvents />
        <ToolBar />
        {loading ? (
          <Loading style={styles.container} />
        ) : (
          <Chart
            data={data}
            caculateType={caculateType}
            onPress={this.onShowMenu}
            onLongPress={$.onToggleItem}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorContainer
  }
})
