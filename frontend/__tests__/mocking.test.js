function Person(name, foods) {
    this.name = name;
    this.foods = foods;
}

Person.prototype.fetchFavFoods = function() {
    return new Promise((resolve, reject) => {
        // Simulate an API
        setTimeout(() => resolve(this.foods), 2000);
    });
}

describe('mocking learning', () => {
    it('mocks a reg function', () => {
        const fetchDogs = jest.fn();

        fetchDogs('Ploom');

        expect(fetchDogs).toHaveBeenCalled();
        expect(fetchDogs).toHaveBeenCalledWith('Ploom');

        fetchDogs('hugo');

        expect(fetchDogs).toHaveBeenCalledTimes(2);
    });

    it('can create a person', () => {
        const me = new Person('Paul', ['pasta', 'burgers']);
        
        expect(me.name).toBe('Paul');
    });
    
    it('can fetch foods', async () => {
        const me = new Person('Paul', ['pasta', 'burgers']);
        // mock the favFoods function
        me.fetchFavFoods = jest.fn().mockResolvedValue(['sushi', 'rice']);

        const favFoods = await me.fetchFavFoods();

        expect(favFoods).toContain('sushi');
    });
});
