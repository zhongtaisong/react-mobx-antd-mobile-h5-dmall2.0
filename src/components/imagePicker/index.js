import React from 'react';
import { ImagePicker } from 'antd-mobile';
import { observer } from 'mobx-react';

// 图片选择器
@observer
class Index extends React.Component {

    onChange = (files, type, index) => {
        if(this.props.onChange) {
            this.props.onChange(files, type, index);
        }
    }

    render() {
        const { multiple=false, files=[], num=5, length=1 } = this.props;
        return (
            <ImagePicker
                {...this.props}
                files={ files }
                onChange={ this.onChange }
                selectable={ files.length < num }
                multiple={ multiple }
                length={ length }
            />
        );
    }
}

export default Index;