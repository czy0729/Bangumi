// @ts-nocheck
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { ViewStyle } from '@types'
import Space from './space'
import Text from './text'
import { spaceTypes } from './util'
import Word from './word'

/** https://github.com/jekingohel/react-native-wordcloud */
class WordCloud extends React.Component<{
  style?: ViewStyle
  options: any
  onPress?: (word: string) => any
}> {
  constructor(props) {
    super(props)
    this.state = {
      words: []
    }

    this.spaceDataObject = null
    this.spaceIdArray = null
    this.distanceCounter = 1

    this.target = {
      width: props.options.width,
      height: props.options.height,
      xOffset: props.options.width / 2,
      yOffset: props.options.height / 2
    }

    this._placeFirstWord = this._placeFirstWord.bind(this)
    this._placeOtherWord = this._placeOtherWord.bind(this)
  }

  componentDidMount() {
    this._init(this.props.options)
  }

  _init(options) {
    this.spaceDataObject = {}
    this.spaceIdArray = []
    const { words: initialWords, fontOffset, minFont, maxFont, fontFamily } = options
    initialWords.sort(function (a, b) {
      if (a.value < b.value) {
        return 1
      } else if (a.value > b.value) {
        return -1
      } else {
        return 0
      }
    })

    const _maxValue = initialWords[0].value
    const _minValue = initialWords[initialWords.length - 1].value
    const fontFactor = (maxFont - minFont) / (_maxValue - _minValue)

    const wordsArray = initialWords.map((wordConfig, index) => {
      const word = new Word({
        ...wordConfig,
        minValue: _minValue,
        maxValue: _maxValue,
        fontFactor,
        fontOffset: fontOffset + minFont,
        fontFamily,
        index,
        _placeFirstWord: this._placeFirstWord,
        _placeOtherWord: this._placeOtherWord
      })
      return word
    })
    this.setState({
      words: wordsArray
    })
  }

  _draw() {
    const { words } = this.state
    if (words.length === 0) return null

    return words.map(word => {
      return word.view
    })
  }

  _updateSpaceIdArray(distanceS, distance) {
    if (this.spaceIdArray.length !== 0) {
      for (let index = 0; index < this.spaceIdArray.length; index++) {
        if (distance < parseFloat(this.spaceIdArray[index].split('_')[0])) {
          this.spaceIdArray.splice(index, 0, distanceS)
          return
        }
      }
      this.spaceIdArray.push(distanceS)
    } else {
      this.spaceIdArray.push(distanceS)
    }
  }

  _pushSpaceData(type, w, h, x, y) {
    // Calculating Distance between (x,y): Key point of Space and Center of Container (this.target.xOffset, this.target.yOffset)
    const distance = Math.sqrt(
      (this.target.xOffset - x) * (this.target.xOffset - x) +
        (this.target.yOffset - y) * (this.target.yOffset - y)
    )

    const distanceS = `${distance}_${this.distanceCounter++}`

    // Update Space Id Array
    this._updateSpaceIdArray(distanceS, distance)

    // Add Space into Space Data Object
    this.spaceDataObject[distanceS] = new Space(type, w, h, x, y)
  }

  _updateTextPosition(word, top, left, transform = false) {
    // Update the styles of the word view
    const textStyle = {
      position: 'absolute',
      left: Math.ceil(left),
      top: Math.ceil(top),
      fontSize: word.font,
      lineHeight: Math.ceil(word.font * 1.1),
      color: word.color
    }

    this.setState(prevState => ({
      words: prevState.words.map(prevWord => {
        if (prevWord !== word) return prevWord

        return {
          ...prevWord,
          view:
            (prevWord.view && (
              <Text key={word.text} style={textStyle} onPress={() => this.props.onPress(word.text)}>
                {word.text}
              </Text>
            )) ||
            null
        }
      })
    }))
  }

  _placeFirstWord(word) {
    const w = word.width
    const h = word.height
    const xoff = this.target.xOffset - w / 2
    const yoff = this.target.yOffset - h / 2
    const tw = this.target.width
    const th = this.target.height

    // Update the styles of the word view
    this._updateTextPosition(word, yoff, xoff)

    // Call the pushSpaceData function with the appropriate parameters
    this._pushSpaceData(spaceTypes.LB, tw - xoff - w, h, xoff + w, yoff + h / 2) //M1
    this._pushSpaceData(spaceTypes.LT, w, th - yoff - h, xoff + w / 2, yoff + h) //M2
    this._pushSpaceData(spaceTypes.RT, xoff, h, xoff, yoff + h / 2) //M3
    this._pushSpaceData(spaceTypes.RB, w, yoff, xoff + w / 2, yoff) //M4

    this._pushSpaceData(spaceTypes.LT, w / 2, h / 2, xoff + w, yoff + h / 2) //C1
    this._pushSpaceData(spaceTypes.RT, w / 2, h / 2, xoff + w / 2, yoff + h) //C2
    this._pushSpaceData(spaceTypes.RB, w / 2, h / 2, xoff, yoff + h / 2) //C3
    this._pushSpaceData(spaceTypes.LB, w / 2, h / 2, xoff + w / 2, yoff) //C4

    this._pushSpaceData(
      spaceTypes.LT,
      tw - xoff - w - w / 2,
      th - yoff - h / 2,
      xoff + w + w / 2,
      yoff + h / 2
    ) //S1
    this._pushSpaceData(
      spaceTypes.RT,
      xoff + w / 2,
      th - yoff - h - h / 2,
      xoff + w / 2,
      yoff + h + h / 2
    ) //S2
    this._pushSpaceData(spaceTypes.RB, xoff - w / 2, yoff + h / 2, xoff - w / 2, yoff + h / 2) //S3
    this._pushSpaceData(spaceTypes.LB, xoff + w / 2, yoff - h / 2, xoff + w / 2, yoff - h / 2) //S4
  }

  _placeOtherWord(word) {
    for (let index = 0; index < this.spaceIdArray.length; index++) {
      const spaceId = this.spaceIdArray[index]
      const obj = this.spaceDataObject[spaceId]

      let alignmentInd = 0
      let alignmentIndCount = 0

      if (word.width <= obj.width && word.height <= obj.height) {
        alignmentInd = spaceTypes.HR
        alignmentIndCount++
      }

      if (this.props.options.verticalEnabled) {
        if (word.height <= obj.width && word.width <= obj.height) {
          alignmentInd = spaceTypes.VR
          alignmentIndCount++
        }
      }

      if (alignmentIndCount > 0) {
        this.spaceDataObject[spaceId] = null
        this.spaceIdArray.splice(index, 1)

        // For Word's Span Position
        let xMul = 1
        let yMul = 1

        // For new Child Spaces
        let xMulS = 1
        let yMulS = 1

        switch (obj.spaceType) {
          case spaceTypes.LB:
            xMul = 0
            yMul = -1
            xMulS = 1
            yMulS = -1
            break
          case spaceTypes.LT:
            xMul = 0
            yMul = 0
            xMulS = 1
            yMulS = 1
            break
          case spaceTypes.RT:
            xMul = -1
            yMul = 0
            xMulS = -1
            yMulS = 1
            break
          case spaceTypes.RB:
            xMul = -1
            yMul = -1
            xMulS = -1
            yMulS = -1
            break
          default:
            break
        }

        if (alignmentIndCount > 1) {
          // Making Horizontal Word in Larger Number
          // Random number[0,5] is >0 and <3 --> HR
          // Random number[0,5] is >3 --> VR

          if (Math.random() * 5 > 3) alignmentInd = spaceTypes.VR
          else alignmentInd = spaceTypes.HR
        }

        const w = word.width
        const h = word.height

        switch (alignmentInd) {
          case spaceTypes.HR:
            // Update the styles of the word view
            this._updateTextPosition(word, obj.y + yMul * h, obj.x + xMul * w)

            if (Math.random() * 2 > 1) {
              /*
               * 			_________________________________
               *			|								|
               *			|				T				|
               *			|								|
               *			|_______________________________|
               *			|				|				|
               *			|	  WORD		|		R		|
               *			|	********	|				|
               *			|_______________|_______________|
               *
               */

              this._pushSpaceData(obj.spaceType, obj.width - w, h, obj.x + xMulS * w, obj.y) //R
              this._pushSpaceData(
                obj.spaceType,
                obj.width,
                obj.height - h,
                obj.x,
                obj.y + yMulS * h
              ) //T
            } else {
              /*
               * 			_________________________________
               *			|				|				|
               *			|		T		|				|
               *			|				|				|
               *			|_______________|		R		|
               *			|				|				|
               *			|	  WORD		|				|
               *			|	********	|				|
               *			|_______________|_______________|
               *
               */

              this._pushSpaceData(
                obj.spaceType,
                obj.width - w,
                obj.height,
                obj.x + xMulS * w,
                obj.y
              ) //R
              this._pushSpaceData(obj.spaceType, w, obj.height - h, obj.x, obj.y + yMulS * h) //T
            }
            break

          case spaceTypes.VR:
            // Update the styles of the word view
            this._updateTextPosition(
              word,
              obj.y + yMul * w + (w - h) / 2,
              obj.x + xMul * h - (w - h) / 2,
              true
            )

            if (Math.random() * 2 > 1) {
              /*
               * 			_________________________________
               *			|								|
               *			|				T				|
               *			|								|
               *			|_______________________________|
               *			|		D		|				|
               *			|		R		|		R		|
               *			|		O		|				|
               *			|_______W_______|_______________|
               *
               */

              this._pushSpaceData(obj.spaceType, obj.width - h, w, obj.x + xMulS * h, obj.y) //R
              this._pushSpaceData(
                obj.spaceType,
                obj.width,
                obj.height - w,
                obj.x,
                obj.y + yMulS * w
              ) //T
            } else {
              /*
               * 			_________________________________
               *			|				|				|
               *			|		T		|				|
               *			|				|				|
               *			|_______________|		R		|
               *			|		D		|				|
               *			|	  	R		|				|
               *			|		O		|				|
               *			|_______W_______|_______________|
               *
               */

              this._pushSpaceData(
                obj.spaceType,
                obj.width - h,
                obj.height,
                obj.x + xMulS * h,
                obj.y
              ) //R
              this._pushSpaceData(obj.spaceType, h, obj.height - w, obj.x, obj.y + yMulS * w) //T
            }
            break

          default:
            break
        }

        return
      }
    }
  }

  render() {
    return (
      <View
        style={{
          position: 'relative',
          width: this.props.options.width,
          height: this.props.options.height,
          ...this.props.style
        }}
      >
        {this._draw()}
      </View>
    )
  }
}

WordCloud.propTypes = {
  options: PropTypes.shape({
    words: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        color: PropTypes.string
      })
    ).isRequired,
    verticalEnabled: PropTypes.bool,
    minFont: PropTypes.number,
    maxFont: PropTypes.number,
    fontOffset: PropTypes.number,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    fontFamily: PropTypes.string
  }).isRequired
}

WordCloud.defaultProps = {
  options: {
    words: [],
    verticalEnabled: true,
    minFont: 10,
    maxFont: 50,
    fontOffset: 1,
    width: 300,
    height: 200,
    fontFamily: ''
  }
}

export default WordCloud
