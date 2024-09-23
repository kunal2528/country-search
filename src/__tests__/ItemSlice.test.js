import { itemsReducer, setItems, loadMoreItems, setSearchTerm } from '../redux/store';

describe('itemsSlice', () => {
  const initialState = {
    allItems: [],
    paginatedItems: [],
    page: 1,
    pageSize: 20,
    searchTerm: '',
    allItemsLoaded: false,
  };

  test('should return the initial state', () => {
    expect(itemsReducer(undefined, {})).toEqual(initialState);
  });

  test('should handle setItems', () => {
    const mockItems = [
      { value: 'AW', label: '🇦🇼 Aruba' },
      { value: 'AF', label: '🇦🇫 Afghanistan' },
    ];
    const expectedState = {
      ...initialState,
      allItems: mockItems,
      paginatedItems: mockItems.slice(0, initialState.pageSize),
      allItemsLoaded: mockItems.length <= initialState.pageSize, 
    };
    expect(itemsReducer(initialState, setItems(mockItems))).toEqual(expectedState);
  });

  test('should handle loadMoreItems', () => {
    const initialStateWithItems = {
      allItems: [
        { value: 'AW', label: '🇦🇼 Aruba' },
        { value: 'AF', label: '🇦🇫 Afghanistan' },
        { value: 'AO', label: '🇦🇴 Angola' },
      ],
      paginatedItems: [
        { value: 'AW', label: '🇦🇼 Aruba' },
        { value: 'AF', label: '🇦🇫 Afghanistan' },
      ],
      page: 1,
      pageSize: 2,
      searchTerm: '',
      allItemsLoaded: false,
    };
  
    const expectedState = {
      ...initialStateWithItems,
      paginatedItems: [
        { value: 'AW', label: '🇦🇼 Aruba' },
        { value: 'AF', label: '🇦🇫 Afghanistan' },
        { value: 'AO', label: '🇦🇴 Angola' },
      ],
      page: 2,
      allItemsLoaded: true,
    };
  
    expect(itemsReducer(initialStateWithItems, loadMoreItems())).toEqual(expectedState);
  });
  

  test('should handle setSearchTerm', () => {
    const initialStateWithItems = {
      ...initialState,
      allItems: [
        { value: 'AW', label: '🇦🇼 Aruba' },
        { value: 'AF', label: '🇦🇫 Afghanistan' },
      ],
    };
    const expectedState = {
      ...initialStateWithItems,
      searchTerm: 'Aruba',
      paginatedItems: [{ value: 'AW', label: '🇦🇼 Aruba' }],
      allItemsLoaded: true,
    };
    expect(itemsReducer(initialStateWithItems, setSearchTerm('Aruba'))).toEqual(expectedState);
  });
  
});
