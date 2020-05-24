import React from 'react';
import { Stepper } from 'antd-mobile';
import { observer } from 'mobx-react';
// less样式
import './index.less';
// 步进器
@observer
class Index extends React.Component {

    onChange = (val) => {
        this.props.onChange && this.props.onChange(val);
    }

    render() {
        const { showNumber=true } = this.props;
        return (
            <Stepper 
                {...this.props}
                onChange={ this.onChange }
                showNumber={ showNumber }
                className='Stepper'
            />
        );
    }
}

export default Index;