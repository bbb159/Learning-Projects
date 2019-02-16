import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../../actions/filters';
import moment from 'moment';
import ExpensiveDashBoardPage from '../../components/ExpenseDashboardPage';

test('should generate set start date action object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

test('should generate set end date action object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});

test('should setup text filter action object', () => {
    const action = setTextFilter('test');
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'test'
    });
});

test('should setup text filter default action object', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

test('should setup sortbyAmount action object', () => { 
    expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT' });
});

test('should setup sortbyDate action object', () => {
    expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' });
});