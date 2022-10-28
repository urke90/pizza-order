import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import { useAppSelector, useAppDispatch } from 'hooks/use-redux';
import {
    incrementPaginationPage,
    decrementPaginationPage
} from 'redux/reducers/pagination-reducer';
import { paginationSelectors } from 'redux/reducers/pagination-reducer';
import { pizzaSelectors } from 'redux/reducers/pizza-reducer';

import PaginationNumberItem from './PaginationNumberItem';

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

    return (
        <div className="pagination">
            <div className="pagination__controls">
                {currentPage > 1 && (
                    <BsArrowLeftCircleFill
                        className="pagination__button-arrow"
                        onClick={handleDecrementPage}
                    />
                )}
                <ul className="pagination__numbers-list">
                    {numberButtons.map((numBtn) => (
                        <PaginationNumberItem
                            key={numBtn}
                            numBtn={numBtn}
                            currentPage={currentPage}
                        />
                    ))}
                </ul>
                {currentPage < totalPages && totalPages > 1 && (
                    <BsArrowRightCircleFill
                        className="pagination__button-arrow"
                        onClick={handleIncrementPage}
                    />
                )}
            </div>
        </div>
    );
};

export default Pagination;
