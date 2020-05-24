// base64图片转为文件
const base64ToFile = (data, fileName) => {
    const dataArr = data.split(",");
    const byteString = atob(dataArr[1]);
    const options = {
        type: "image/jpeg",
        endings: "native"
    };
    const u8Arr = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        u8Arr[i] = byteString.charCodeAt(i);
    }
    return new File([u8Arr], fileName + ".jpg", options);
};

export default base64ToFile;