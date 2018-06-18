// Testing suite setup

import enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new EnzymeAdapter() });