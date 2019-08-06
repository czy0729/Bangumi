import { StyleSheet } from 'react-native'

export default theme =>
  StyleSheet.create({
    container: {
      zIndex: theme.action_sheet_zindex
    },
    wrap: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0
    },
    content: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.fill_base
    },
    mask: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.fill_mask
    },
    title: {
      flex: 1,
      alignItems: 'center',
      // justifyContent: 'center',
      marginTop: theme.h_spacing_lg,
      marginBottom: theme.h_spacing_lg
    },
    titleText: {
      fontWeight: '500'
    },
    message: {
      flex: 1,
      alignItems: 'center',
      // justifyContent: 'center',
      marginBottom: theme.h_spacing_lg
    },
    btn: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: theme.actionsheet_item_height,
      borderStyle: 'solid',
      borderTopWidth: 1,
      borderTopColor: theme.border_color_base,
      backgroundColor: 'white'
    },
    cancelBtn: {
      marginTop: theme.v_spacing_md,
      position: 'relative'
    },
    cancelBtnMask: {
      position: 'absolute',
      top: -theme.v_spacing_md,
      left: 0,
      right: 0,
      height: theme.v_spacing_md,
      backgroundColor: theme.fill_grey,
      borderStyle: 'solid',
      borderTopWidth: 1,
      borderTopColor: theme.border_color_base
    },
    destructiveBtn: {
      color: theme.brand_error,
      fontSize: theme.actionsheet_item_font_size
    }
  })
