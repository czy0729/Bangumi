/*
 * @Author: czy0729
 * @Date: 2019-03-24 04:39:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-23 15:17:04
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { SectionTitle, Eps } from '@screens/_'
import _ from '@styles'

const Ep = ({ style }, { $ }) => (
  <View style={[_.container.wind, style]}>
    <SectionTitle>章节</SectionTitle>
    <Eps
      style={_.mt.md}
      advance
      pagination
      login={$.isLogin}
      subjectId={$.params.subjectId}
      eps={$.subjectEp.eps}
      userProgress={$.userProgress}
      onSelect={$.doEpsSelect}
    />
  </View>
)

Ep.contextTypes = {
  $: PropTypes.object
}

export default observer(Ep)
