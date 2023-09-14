const color_colorPicker = document.getElementById('color_colorPicker');
const gray_scaleBox = document.getElementById('gray_scaleBox');
const gray_hexValue = document.getElementById('gray_hexValue');
const gray_rgbValue = document.getElementById('gray_rgbValue');
const color_hexValue = document.getElementById('color_hexValue');
const color_rgbValue = document.getElementById('color_rgbValue');

function convertToGrayscale(hexColor) {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    const grayscaleValue = 0.3 * r + 0.59 * g + 0.11 * b;
    return {
        hex: `#${Math.floor(grayscaleValue).toString(16).padStart(2, '0').repeat(3)}`,
        rgb: Math.floor(grayscaleValue)
    };
}
function hexToRgb(hex) {
    hex = hex.replace(/^#/, ''); // Remove # symbol
    var bigint = parseInt(hex, 16);
    var red= (bigint >> 16) & 255;
    var green = (bigint >> 8) & 255;
    var blue = bigint & 255;
    return {r:red , g:green, b:blue};
}

//rgb to grayscale
color_colorPicker.addEventListener('input', () => {
    const graytocolor_scaleColor = convertToGrayscale(color_colorPicker.value);

    color_hexValue.textContent = `Hex: ${color_colorPicker.value}`;
    const RGBI=hexToRgb(color_colorPicker.value);
    const RGBO=graytocolor_scaleColor.rgb;
    const HEXO=graytocolor_scaleColor.hex;
    //
    document.getElementById("ri").textContent = RGBI.r;
    document.getElementById("gi").textContent = RGBI.g;
    document.getElementById("bi").textContent = RGBI.b;
    gray_hexValue.textContent=`Hex: ${HEXO}`;
    gray_scaleBox.style.backgroundColor=HEXO;
    //example
    const result = RGBO

    document.getElementById("r").textContent = RGBI.r;
    document.getElementById("g").textContent = RGBI.g;
    document.getElementById("b").textContent = RGBI.b;
    const res = document.querySelectorAll('.res');
    res.forEach(element => {
        element.textContent = result;
    });

    //gradient on equal icon
    document.getElementById("eq").style += `background: ${color_colorPicker.value};
    background: -moz-linear-gradient(90deg, ${color_colorPicker.value} 50%, ${graytocolor_scaleColor.hex} 50%);
    background: -webkit-linear-gradient(90deg, ${color_colorPicker.value} 50%, ${graytocolor_scaleColor.hex} 50%);
    background: linear-gradient(90deg, ${color_colorPicker.value} 50%, ${graytocolor_scaleColor.hex} 50%);`
});