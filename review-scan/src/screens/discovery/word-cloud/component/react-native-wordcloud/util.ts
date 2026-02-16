// @ts-nocheck
const Util = {}

export const spaceTypes = {
  LB: 1, //Left Bottom
  LT: 2, //Left Top
  RT: 3, //Right Top
  RB: 4, //Right Bottom
  HR: 1, //Horizontal
  VR: 2 //Vertical
}

Util.getRandomColor = () => {
  var letters = '0123456789ABCDEF'.split('')
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15)]
  }
  return color
}
export default Util
