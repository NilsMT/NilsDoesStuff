const color_colorPicker = document.getElementById('color_colorPicker');
const output_scaleBox = document.getElementById('output_scaleBox');
const output_hexValue = document.getElementById('output_hexValue');
const output_rgbValue = document.getElementById('output_rgbValue');
const input_hexValue = document.getElementById('input_hexValue');
const input_rgbValue = document.getElementById('input_rgbValue');

function convertToGrayscale(hexColor) {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    const grayscaleValue = Math.floor(0.3 * r + 0.59 * g + 0.11 * b);
    return {
        hex: `#${grayscaleValue.toString(16).padStart(2, '0').repeat(3)}`,
        rgb: [grayscaleValue,grayscaleValue,grayscaleValue]
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
    const output = convertToGrayscale(color_colorPicker.value);

    input_hexValue.textContent = `Hex: ${color_colorPicker.value}`;
    const RGBI=hexToRgb(color_colorPicker.value);
    const RGBO=output.rgb;
    const HEXO=output.hex;
    //
    document.getElementById("ri").textContent = RGBI.r;
    document.getElementById("gi").textContent = RGBI.g;
    document.getElementById("bi").textContent = RGBI.b;
    output_hexValue.textContent=`Hex: ${HEXO}`;
    output_scaleBox.style.backgroundColor=HEXO;
    //example
    const result = RGBO

    document.getElementById("r").textContent = RGBI.r;
    document.getElementById("g").textContent = RGBI.g;
    document.getElementById("b").textContent = RGBI.b;
    //red
    var res = document.querySelectorAll('.resr');
    res.forEach(element => {
        element.textContent = result[0];
    });
    //green
    res = document.querySelectorAll('.resg');
    res.forEach(element => {
        element.textContent = result[1];
    });
    //blue
    res = document.querySelectorAll('.resb');
    res.forEach(element => {
        element.textContent = result[2];
    });

    //gradient on equal icon
    document.getElementById("eq").style += `background: ${color_colorPicker.value};
    background: -moz-linear-gradient(90deg, ${color_colorPicker.value} 50%, ${output.hex} 50%);
    background: -webkit-linear-gradient(90deg, ${color_colorPicker.value} 50%, ${output.hex} 50%);
    background: linear-gradient(90deg, ${color_colorPicker.value} 50%, ${output.hex} 50%);`
});