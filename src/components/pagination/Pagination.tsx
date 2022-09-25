import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import { useAppSelector, useAppDispatch } from 'hooks/useRedux';
import {
    incrementPaginationPage,
    decrementPaginationPage,
    selectPaginationPage
} from 'redux/reducers/paginationReducer';
import { paginationSelectors } from 'redux/reducers/paginationReducer';
import { pizzaSelectors } from 'redux/reducers/pizzaReducer';
import { generateGeneralClassName } from 'util/classGenerators';

import './Pagination.scss';

const Pagination: React.FC = () => {
    const dispatch = useAppDispatch();
    // total pizzas fetched
    const itemsCount = useAppSelector(pizzaSelectors.pizzas).length;
    const itemsPerPage = useAppSelector(paginationSelectors.itemsPerPage);
    const currentPage = useAppSelector(paginationSelectors.currentPage);
    //total number of pages
    const totalPages = Math.ceil(itemsCount / itemsPerPage);
    // number of pages button needs to be rendered
    const numberButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

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
                            onClick={handleDecrementPage}
                        />
                    </div>
                )}
                <ul className="pagination__numbers-list">
                    {numberButtons.map((numBtn) => (
                        <li
                            key={numBtn}
                            className={`pagination__numbers-item ${generateGeneralClassName(
                                numBtn === currentPage,
                                'pagination__numbers-item--active'
                            )}`}
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
                            onClick={handleIncrementPage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
export default Pagination;
