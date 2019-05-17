/*
 * @Author: czy0729
 * @Date: 2019-05-16 01:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-16 02:07:42
 */
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Button, Popover, Menu } from '@components'
import { observer } from '@utils/decorators'
import { IOS } from '@constants'
import { MODEL_SEARCH_CAT } from '@constants/model'

const Category = (props, { $ }) => {
  const { cat } = $.state
  const data = MODEL_SEARCH_CAT.data.map(item => item.label)
  const popoverProps = IOS
    ? {
        overlay: <Menu data={data} onSelect={$.onSelect} />
      }
    : {
        data,
        onSelect: $.onSelect
      }
  return (
    <Popover placement='bottom' {...popoverProps}>
      <Button style={styles.btn} type='ghostMain'>
        {MODEL_SEARCH_CAT.getLabel(cat)}
      </Button>
    </Popover>
  )
}

Category.contextTypes = {
  $: PropTypes.object
}

export default observer(Category)

const styles = StyleSheet.create({
  btn: {
    width: 72,
    height: 34,
    borderRadius: 64
  }
})
