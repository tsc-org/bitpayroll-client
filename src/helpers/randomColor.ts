const colors = [
    "#16697A",
    "#AC3931",
    "#D9E76C",
    "#BFBDC1",
    "#482C3D",
    "#537D8D",
]

export const randomColor = () => {
    let randomNumber = Math.floor((colors.length) * Math.random())
    return colors[randomNumber]
}