/*
 * @Author: czy0729
 * @Date: 2019-08-09 10:53:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 11:15:40
 */
import { StyleSheet } from 'react-native'
import _ from '@styles'

export default theme =>
  StyleSheet.create({
    container: {
      zIndex: theme.action_sheet_zindex
    },
    wrap: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0
    },
    content: {
      position: 'absolute',
      right: _.sm,
      bottom: _.sm,
      left: _.sm,
      backgroundColor: theme.fill_base,
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    mask: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: theme.fill_mask
    },
    title: {
      flex: 1,
      alignItems: 'center',
      marginTop: theme.h_spacing_lg,
      marginBottom: theme.h_spacing_lg
    },
    titleText: {
      fontWeight: '500'
    },
    message: {
      flex: 1,
      alignItems: 'center',
      marginBottom: theme.h_spacing_lg
    },
    btn: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: theme.actionsheet_item_height,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: _.colorBorder,
      backgroundColor: 'white'
    },
    btnText: {
      color: '#007AFF'
    },
    cancelBtn: {
      position: 'relative',
      marginTop: theme.v_spacing_md
    },
    cancelBtnMask: {
      position: 'absolute',
      top: -theme.v_spacing_md,
      right: 0,
      left: 0,
      height: theme.v_spacing_md,
      backgroundColor: theme.fill_grey,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: theme.border_color_base
    },
    destructiveBtn: {
      color: theme.brand_error,
      fontSize: theme.actionsheet_item_font_size
    }
  })
