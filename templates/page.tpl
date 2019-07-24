import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { inject, observer } from '@utils/decorators'
// import { hm } from '@utils/fetch'
import _ from '@styles'
import Store from './store'

const title = ''

export default
@inject(Store)
@observer
class  extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $ } = this.context
    await $.init()

    // hm()
  }

  render() {
    return (
      <ScrollView
        style={_.container.screen}
        contentContainerStyle={_.container.bottom}
      >
        {/* */}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({})
