import './ExpenceFilter.css';

import {useSelector, useDispatch} from 'react-redux'
import { ExpencesAction } from '../../store/expences-slice'

function ExpenceFilter(props) {
    const filterYear = useSelector( state => state.expences.filterYear)
    const dispatch = useDispatch()
    const onChangeHandler = (event) =>{
        dispatch(ExpencesAction.filter(event.target.value))
    }

    return <div className='expenses-filter'>
        <div className='expenses-filter__control'>
            <label>Filter by year</label>
            <select onChange={onChangeHandler} >
                <option selected={filterYear === "2022"} value='2022'>2022</option>
                <option selected={filterYear === "2021"} value='2021'>2021</option>
                <option selected={filterYear === "2020"} value='2020'>2020</option>
                <option selected={filterYear === "2019"} value='2019'>2019</option>
            </select>
        </div>
    </div>
}

export default ExpenceFilter;