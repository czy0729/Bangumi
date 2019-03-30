/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:16:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-29 07:10:35
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ScrollView, View } from 'react-native'
import inject from '@utils/inject'
import _ from '@styles'
import Head from './head'
import Box from './box'
import Ep from './ep'
import Summary from './summary'
import Rating from './rating'
import Character from './character'
import Staff from './staff'
import Blog from './blog'
import Topic from './topic'
import Store from './store'

class Subject extends React.Component {
  // static navigationOptions = {
  //   header: null
  // }

  static contextTypes = {
    $: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.mounted()
  }

  render() {
    return (
      <ScrollView style={_.container.flex}>
        <Head />
        <Box style={_.mt.lg} />
        <Ep style={_.mt.lg} />
        <Summary style={_.mt.lg} />
        <Rating style={_.mt.lg} />
        <Character style={_.mt.lg} />
        <Staff style={_.mt.lg} />
        <Blog style={_.mt.lg} />
        <Topic style={_.mt.lg} />
      </ScrollView>
    )
  }
}

export default inject(Store)(observer(Subject))
