/*
 * @Author: czy0729
 * @Date: 2020-01-13 11:23:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-01 12:04:06
 */
import React from 'react'
import { ScrollView } from '@components'
import { _, userStore } from '@stores'
import { withHeader, ob } from '@utils/decorators'
import { initXsbRelationOTA } from '@constants/cdn'
import Base from './base'
import ScreenOrientation from './screen-orientation'
import UpdateTourist from './update-tourist'
import UpdateAdvance from './update-advance'
import UsersAdvance from './users-advance'
import Detail from './detail'

const title = '开发菜单'

export default
@withHeader({
  screen: title,
  hm: ['dev', 'DEV']
})
@ob
class DEV extends React.Component {
  state = {
    showDetail: false
  }

  componentDidMount() {
    initXsbRelationOTA()
  }

  onShow = () => {
    this.setState({
      showDetail: true
    })
  }

  rederOptions() {
    const { navigation } = this.props
    const { isDeveloper } = userStore
    return (
      <>
        {isDeveloper && <Base navigation={navigation} />}
        <ScreenOrientation />
        {isDeveloper && (
          <>
            <UpdateTourist navigation={navigation} />
            <UpdateAdvance navigation={navigation} />
            <UsersAdvance navigation={navigation} />
          </>
        )}
      </>
    )
  }

  render() {
    return (
      <ScrollView
        style={this.styles.screen}
        contentContainerStyle={this.styles.container}
        scrollToTop
      >
        {this.rederOptions()}
        <Detail />
      </ScrollView>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(() => ({
  screen: {
    backgroundColor: _.colorPlain
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: _.bottom
  }
}))
