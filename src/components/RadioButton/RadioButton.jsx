import * as React from 'react';
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import { FormControlLabel } from '@mui/material';

export default function ColorRadioButtons({ selectedValue, setSelectedValue }) {

    const handleChange = (event) => {
        debugger
        setSelectedValue(event.target.value);
    };

    const controlProps = (item) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item },
    });

    return (
        <div>
            <label htmlFor="">Unpaid</label>
            <Radio {...controlProps('Unpaid')} color='error' />
            <label htmlFor="">Paid</label>
            <Radio {...controlProps('Paid')} color="success" />
        </div>
    );
}
