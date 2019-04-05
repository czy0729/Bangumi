/*
 * @Author: czy0729
 * @Date: 2019-03-24 04:39:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-05 09:41:27
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { Eps } from '@screens/_'
import _ from '@styles'

const Ep = ({ style }, { $ }) => {
  if (!$.eps) {
    return null
  }
  return (
    <View style={[_.container.wind, style]}>
      <Text size={20}>章节</Text>
      <Eps
        style={_.mt.sm}
        login={$.isLogin}
        subjectId={$.params.subjectId}
        advance
        eps={$.eps}
        userProgress={$.userProgress}
        onSelect={$.doEpsSelect}
      />
    </View>
  )
}

Ep.contextTypes = {
  $: PropTypes.object
}

export default observer(Ep)
