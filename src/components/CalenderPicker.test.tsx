import React from 'react';
import { render, } from '@testing-library/react';
import { describe, it } from '@jest/globals';

import CalenderPicker from './CalenderPicker';



describe('CalenderPicker Component', () => {

    it('renders without crashing', () => {
        render(<CalenderPicker initialStartDate={new Date()} />);
    });

});
