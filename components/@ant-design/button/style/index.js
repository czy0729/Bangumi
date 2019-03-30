import { StyleSheet } from 'react-native'

export default theme =>
  StyleSheet.create({
    container: {
      flexDirection: 'row'
    },
    defaultHighlight: {
      backgroundColor: theme.fill_tap,
      borderColor: theme.border_color_base
    },
    primaryHighlight: {
      backgroundColor: theme.primary_button_fill_tap,
      borderColor: theme.primary_button_fill
    },
    ghostHighlight: {
      backgroundColor: 'transparent',
      borderColor: theme.ghost_button_fill_tap
    },
    warningHighlight: {
      backgroundColor: theme.warning_button_fill_tap,
      borderColor: theme.warning_button_fill
    },
    wrapperStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.radius_md,
      borderWidth: 1
    },
    largeRaw: {
      height: theme.button_height,
      paddingLeft: theme.h_spacing_lg,
      paddingRight: theme.h_spacing_lg
    },
    smallRaw: {
      height: theme.button_height_sm,
      paddingLeft: theme.h_spacing_sm,
      paddingRight: theme.h_spacing_sm
    },
    defaultRaw: {
      backgroundColor: theme.fill_base,
      borderColor: theme.border_color_base
    },
    primaryRaw: {
      backgroundColor: theme.primary_button_fill,
      borderColor: theme.primary_button_fill
    },
    ghostRaw: {
      backgroundColor: 'transparent',
      borderColor: theme.ghost_button_color
    },
    warningRaw: {
      backgroundColor: theme.warning_button_fill,
      borderColor: theme.warning_button_fill
    },
    defaultDisabledRaw: {
      backgroundColor: theme.fill_disabled,
      borderColor: theme.fill_disabled
    },
    primaryDisabledRaw: {
      opacity: 0.4
    },
    ghostDisabledRaw: {
      borderColor: `${theme.color_text_base}1A` // alpha 10%  https://codepen.io/chriscoyier/pen/XjbzAW
    },
    warningDisabledRaw: {
      opacity: 0.4
    },
    defaultHighlightText: {
      color: theme.color_text_base
    },
    primaryHighlightText: {
      color: `${theme.color_text_base_inverse}4D` // alpha 30%  https://codepen.io/chriscoyier/pen/XjbzAW
    },
    ghostHighlightText: {
      color: theme.ghost_button_fill_tap
    },
    warningHighlightText: {
      color: `${theme.color_text_base_inverse}4D` // alpha 30%  https://codepen.io/chriscoyier/pen/XjbzAW
    },
    largeRawText: {
      fontSize: theme.button_font_size
    },
    smallRawText: {
      fontSize: theme.button_font_size_sm
    },
    defaultRawText: {
      color: theme.color_text_base
    },
    primaryRawText: {
      color: theme.color_text_base_inverse
    },
    ghostRawText: {
      color: theme.ghost_button_color
    },
    warningRawText: {
      color: theme.color_text_base_inverse
    },
    defaultDisabledRawText: {
      color: `${theme.color_text_base}4D` // alpha 30%  https://codepen.io/chriscoyier/pen/XjbzAW
    },
    primaryDisabledRawText: {
      color: `${theme.color_text_base_inverse}99` // alpha 60%  https://codepen.io/chriscoyier/pen/XjbzAW
    },
    ghostDisabledRawText: {
      color: `${theme.color_text_base}1A` // alpha 10%  https://codepen.io/chriscoyier/pen/XjbzAW
    },
    warningDisabledRawText: {
      color: `${theme.color_text_base_inverse}99` // alpha 60%  https://codepen.io/chriscoyier/pen/XjbzAW
    },
    indicator: {
      marginRight: theme.h_spacing_md
    }
  })
