/*
 * @Author: czy0729
 * @Date: 2020-04-04 02:53:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-10 11:58:17
 */
import React, { isValidElement } from 'react'
import { Platform, ScrollView, TouchableOpacity, View } from 'react-native'
import { Popover as Pop, PopoverController } from 'react-native-modal-popover'
import { _ } from '@stores'
import { WithTheme } from '../style'
import PopoverStyles from './style'

export class PopoverItem extends React.PureComponent {
  render() {
    const { value, disabled, children, onSelect, style } = this.props
    return (
      <WithTheme>
        {(_, theme) => (
          <TouchableOpacity
            activeOpacity={0.75}
            disabled={disabled}
            onPress={() => {
              if (typeof onSelect === 'function') {
                onSelect(value)
              }
            }}
            style={[
              {
                padding: theme.v_spacing_md
              },
              style
            ]}
          >
            {children}
          </TouchableOpacity>
        )}
      </WithTheme>
    )
  }
}

export default class Popover extends React.PureComponent {
  static defaultProps = {
    onSelect: () => {}
  }

  static Item = PopoverItem

  onSelect = (value, closePopover) => {
    const { onSelect } = this.props
    if (onSelect) {
      onSelect(value)
    }
    closePopover()
  }

  renderOverlay = closePopover => {
    const { overlay, renderOverlayComponent } = this.props
    const items = React.Children.map(overlay, child => {
      if (!isValidElement(child)) {
        return child
      }
      return React.cloneElement(child, {
        // fixed
        onSelect: v => {
          if (child.props.onSelect) {
            child.props.onSelect(v)
            this.onSelect(v, closePopover)
          } else {
            this.onSelect(v, closePopover)
          }
        }
      })
    })
    if (typeof renderOverlayComponent === 'function') {
      return renderOverlayComponent(items)
    }
    return (
      <ScrollView
        style={{
          maxHeight: parseInt(_.window.height * 0.48),
          backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2)
        }}
      >
        {items}
      </ScrollView>
    )
  }

  render() {
    const {
      style,
      contentStyle, // @add
      arrowStyle, // @add
      children,
      disabled,
      triggerStyle,
      styles,
      placement,
      onLongPress // @add
    } = this.props
    return (
      <WithTheme themeStyles={PopoverStyles} styles={styles}>
        {s => (
          <PopoverController>
            {({
              openPopover,
              closePopover,
              popoverVisible,
              setPopoverAnchor,
              popoverAnchorRect
            }) => (
              <View style={style}>
                <TouchableOpacity
                  ref={setPopoverAnchor}
                  onPress={openPopover}
                  onLongPress={onLongPress} // @add
                  style={triggerStyle}
                  disabled={disabled}
                  activeOpacity={0.75}
                >
                  {children}
                </TouchableOpacity>
                <Pop
                  popoverStyle={s.popover}
                  contentStyle={[s.content, contentStyle]} // @add
                  arrowStyle={{
                    ...(Platform.OS === 'ios' ? s.arrow : s.arrowAndroid),
                    ...arrowStyle
                  }}
                  backgroundStyle={s.background}
                  visible={popoverVisible}
                  onClose={closePopover}
                  fromRect={popoverAnchorRect}
                  supportedOrientations={['portrait', 'landscape']}
                  placement={placement}
                  duration={0}
                  useNativeDriver
                >
                  {this.renderOverlay(closePopover)}
                </Pop>
              </View>
            )}
          </PopoverController>
        )}
      </WithTheme>
    )
  }
}
