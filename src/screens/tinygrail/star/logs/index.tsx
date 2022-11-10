/*
 * @Author: czy0729
 * @Date: 2021-03-02 09:48:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-09 07:01:59
 */
import React from 'react'
import { Animated } from 'react-native'
import { Header, Touchable, Flex, ListView } from '@components'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import { refreshControlProps } from '@tinygrail/styles'
import Label from '../label'
import Log from '../log'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const width = _.r(256)

class Logs extends React.Component {
  state = {
    show: false,
    x: new Animated.Value(0)
  }

  componentDidMount() {
    const { $, navigation }: Ctx = this.context
    navigation.setParams({
      extra: (
        <>
          <Label $={$} />
          <IconHeader
            style={_.mr._right}
            size={24}
            color={_.colorTinygrailPlain}
            name='md-menu-open'
            onPress={this.toggleShow}
          />
        </>
      )
    })
  }

  toggleShow = () => {
    const { show } = this.state
    this.setState({
      show: !show
    })

    if (show) {
      this.close()
    } else {
      this.open()
    }
  }

  open = () => {
    const { x } = this.state
    Animated.timing(x, {
      toValue: 1,
      duration: 160,
      useNativeDriver: true
    }).start()
  }

  close = () => {
    const { x } = this.state
    Animated.timing(x, {
      toValue: 0,
      duration: 160,
      useNativeDriver: true
    }).start()
  }

  renderItem = ({ item, index }) => <Log index={index} {...item} />

  render() {
    const { $ }: Ctx = this.context
    const { show, x } = this.state
    return (
      <>
        <Header
          title='通天塔(α)'
          hm={['tinygrail/star', 'Star']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
          headerRight={() => (
            <Flex>
              <Label $={$} />
              <IconHeader
                size={24}
                color={_.colorTinygrailPlain}
                name='md-menu-open'
                onPress={this.toggleShow}
              />
            </Flex>
          )}
        />
        <Flex style={this.styles.logs} pointerEvents={show ? 'auto' : 'none'}>
          <Flex.Item />
          <Touchable style={this.styles.wrap} useRN onPress={this.toggleShow}>
            <Animated.View
              style={[
                this.styles.mask,
                {
                  opacity: x
                }
              ]}
            />
          </Touchable>
          <Animated.View
            style={[
              this.styles.list,
              {
                transform: [
                  {
                    translateX: x.interpolate({
                      inputRange: [0, 1],
                      outputRange: [width, 0]
                    })
                  }
                ]
              }
            ]}
          >
            <ListView
              style={_.container.flex}
              contentContainerStyle={this.styles.contentContainerStyle}
              keyExtractor={keyExtractor}
              refreshControlProps={refreshControlProps}
              data={$.starLogs}
              windowSize={6}
              initialNumToRender={24}
              maxToRenderPerBatch={24}
              updateCellsBatchingPeriod={24}
              lazy={24}
              showFooter={false}
              renderItem={this.renderItem}
              onHeaderRefresh={$.fetchStarLogs}
            />
          </Animated.View>
        </Flex>
      </>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(Logs)
