import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import { useAppSelector, useAppDispatch } from 'hooks/useRedux';
import {
    incrementPaginationPage,
    decrementPaginationPage,
    selectPaginationPage
} from 'redux/reducers/paginationReducer';

import './Pagination.scss';

const Pagination: React.FC = () => {
    // total pizzas fetched
    const itemsCount = useAppSelector(
        (state) => state.pizzaReducer.pizzas.length
    );
    // number of pizzas shown per page
    const itemsPerPage = useAppSelector(
        (state) => state.paginationReducer.itemsPerPage
    );
    // current page in pagination
    const currentPage = useAppSelector(
        (state) => state.paginationReducer.currentPage
    );
    //total number of pages
    const totalPages = Math.ceil(itemsCount / itemsPerPage);

    // number of pages button needs to be rendered
    const numberButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

    const dispatch = useAppDispatch();

    const handleIncrementPage = () => dispatch(incrementPaginationPage());
    const handleDecrementPage = () => dispatch(decrementPaginationPage());
    const handlePageChange = (numBtn: number) =>
        dispatch(selectPaginationPage({ selectedPage: numBtn }));

    return (
        <div className="pagination">
            <div className="pagination__controls">
                {currentPage > 1 && (
                    <div className="pagination__arrow">
                        <BsArrowLeftCircleFill
                            className="pagination__button-arrow"
                            // size={30}
                            // color="#c80037"
                            onClick={handleDecrementPage}
                        />
                    </div>
                )}
                <ul className="pagination__numbers-list">
                    {numberButtons.map((numBtn) => (
                        <li
                            key={numBtn}
                            // className="pagination__numbers-item"
                            className={`pagination__numbers-item ${
                                numBtn === currentPage
                                    ? 'pagination__numbers-item--active'
                                    : ''
                            }`}
                            onClick={() => handlePageChange(numBtn)}
                        >
                            {numBtn}
                        </li>
                    ))}
                </ul>
                {currentPage < totalPages && totalPages > 1 && (
                    <div className="pagination__arrow">
                        <BsArrowRightCircleFill
                            className="pagination__button-arrow"
                            // size={30}
                            // color="#c80037"
                            onClick={handleIncrementPage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
export default Pagination;
