import { shallow } from 'enzyme';

import ItemComponent from '../components/Item';

const fakeItem = {
    id: 'ABC123',
    title: 'Awesome Test Item',
    price: 5000,
    description: 'This cool item is made for testing!',
    image: 'dog.jpg',
    largeImage: 'largedog.jpg',
};

describe('<Item/>', () => {
    it('renders the pricetag and title properly', () => {
        const wrapper = shallow(<ItemComponent item={fakeItem} />);
        const priceTag = wrapper.find('PriceTag');
        const title = wrapper.find('Title a');

        expect(priceTag.children().text()).toBe('€50');
        expect(title.text()).toBe(fakeItem.title);
    });
    
    it('renders the image properly', () => {
        const wrapper = shallow(<ItemComponent item={fakeItem} />);
        const img = wrapper.find('img');
        
        expect(img.props().src).toBe(fakeItem.image);
        expect(img.props().alt).toBe(fakeItem.title);
    });

    it('renders out the buttons properly', () => {
        const wrapper = shallow(<ItemComponent item={fakeItem} />);
        const buttonList = wrapper.find('.buttonList');

        expect(buttonList.children()).toHaveLength(3);
        expect(buttonList.find('Link')).toHaveLength(1);
        expect(buttonList.find('AddToCart').exists()).toBe(true);
        expect(buttonList.find('DeleteItem').exists()).toBe(true);
    })
});
