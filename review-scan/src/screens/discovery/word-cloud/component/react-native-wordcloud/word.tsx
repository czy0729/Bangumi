// @ts-nocheck
import Text from './text'
import Util from './util'

export default class Word {
  constructor(wordConfig) {
    this.index = wordConfig.index
    this._placeFirstWord = wordConfig._placeFirstWord
    this._placeOtherWord = wordConfig._placeOtherWord
    this.text = wordConfig.text
    this.value = wordConfig.value
    this.fontFactor = wordConfig.fontFactor
    this.fontOffset = wordConfig.fontOffset
    this.minValue = wordConfig.minValue

    this.fontFamily = wordConfig.fontFamily
    this.font = null
    this.color = wordConfig.color
    if (this.color === null || this.color === '') {
      this.color = Util.getRandomColor()
    }
    this.view = null
    this.width = null
    this.height = null
    this._init()
  }

  _init() {
    this._setFont()
    this._setViewSize()
  }

  _setFont() {
    this.font = Math.floor((this.value - this.minValue) * this.fontFactor + this.fontOffset)
  }

  _setViewSize() {
    const textStyle = {
      position: 'absolute',
      left: 0,
      top: 0,
      fontSize: this.font,
      lineHeight: this.font,
      color: this.color,
      opacity: 0,
      pointerEvents: 'none'
    }

    this.view = (
      <Text
        key={`${this.index}|${this.text}`}
        style={textStyle}
        onLayout={event => this._onLayout(event)}
      >
        {this.text}
      </Text>
    )
  }

  _onLayout(event) {
    const { width, height } = event.nativeEvent.layout
    this.width = width
    this.height = height
    if (this.index === 0) {
      this._placeFirstWord(this)
    } else {
      this._placeOtherWord(this)
    }
  }
}
