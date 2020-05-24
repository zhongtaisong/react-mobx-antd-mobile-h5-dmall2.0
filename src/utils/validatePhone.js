// 手机号码 - 校验
const validatePhone = (rule, value, callback) => {
    let reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
    if ( !reg.test( value ) ) {
        callback('请输入合法的手机号码！');
    } else {
        callback();
    }
};

export default validatePhone;