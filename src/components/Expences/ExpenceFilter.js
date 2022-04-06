import './ExpenceFilter.css';

import {useSelector, useDispatch} from 'react-redux'
import { ExpencesAction } from '../../store/expences-slice'

function ExpenceFilter(props) {
    const filterYear = useSelector( state => state.expences.filterYear)
    const filtercategory = useSelector( state => state.expences.filtercategory)
    const dispatch = useDispatch()
    const onChangeYearHandler = (event) =>{
        dispatch(ExpencesAction.filter({year: event.target.value,category: filtercategory}))
    }

    const onChangeCategoryHandler = (event) =>{
        dispatch(ExpencesAction.filter({year: filterYear,category: event.target.value}))
    }
    return <div className='expenses-filter'>
        <div className='expenses-filter__control'>
            <label>Filter by Catagory</label>
            <select onChange={onChangeCategoryHandler} >
                <option selected={filtercategory === "all"} value='all'>All</option>
                <option selected={filtercategory === "fuel"} value='fuel'>Fuel</option>
                <option selected={filtercategory === "personal"} value='personal'>Personal</option>
                <option selected={filtercategory === "food"} value='food'>Food</option>
                <option selected={filtercategory === "other"} value='other'>Other</option>
            </select>
            <label>Filter by year</label>
            <select onChange={onChangeYearHandler} >
                <option selected={filterYear === "2022"} value='2022'>2022</option>
                <option selected={filterYear === "2021"} value='2021'>2021</option>
                <option selected={filterYear === "2020"} value='2020'>2020</option>
                <option selected={filterYear === "2019"} value='2019'>2019</option>
            </select>
        </div>
    </div>
}

export default ExpenceFilter;