/*
 * @Author: czy0729
 * @Date: 2019-09-04 21:58:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-04 22:02:39
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Text, Button } from '@components'
import { observer } from '@utils/decorators'
import _ from '@styles'

function Auth(props, { $ }) {
  return (
    <Flex style={_.container.wind}>
      <Button type='main' onPress={$.doAuth}>
        点击授权
      </Button>
    </Flex>
  )
}

Auth.contextTypes = {
  $: PropTypes.object
}

export default observer(Auth)
