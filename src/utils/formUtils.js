import { Form } from 'antd';
// 双向绑定
class FormUtils {
    formToMobx = (obj = {}) => {
        let targetData = {};
        for(const [key, values] of Object.entries( obj ) ){
            const { errors, value } = values;
            if( errors ){
                targetData[key] = values;
            }else{
                targetData[key] = value;
            }
        }
        return targetData;
    }
    mobxToForm = (obj = {}) => {
        let targetData = {};
        for(const [key, values] of Object.entries( obj ) ){
            if( values ){
                const { errors } = values;
                if( errors ){
                    targetData[key] = Form.createFormField({
                        value: values.value, errors
                    });
                }else{
                    targetData[key] = Form.createFormField({
                        value: values
                    });
                }
            }else{
                targetData[key] = Form.createFormField({
                    value: values
                });
            }
        }
        return targetData;
    }
}

export default new FormUtils();