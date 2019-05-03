import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import CartCount from '../components/CartCount';

const fakeCartCount = 10

describe('<CartCount/>', () => {
    it('renders', () => {
        shallow(<CartCount count={fakeCartCount} />);
    });

    it('matches the snapshot', () => {
        const wrapper = shallow(<CartCount count={fakeCartCount} />);
        
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
    
    it('updates via props', () => {
        const wrapper = shallow(<CartCount count={50} />);

        expect(toJSON(wrapper)).toMatchSnapshot();

        wrapper.setProps({ count: 12 });

        expect(toJSON(wrapper)).toMatchSnapshot();
    });
})
