import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import { useAppSelector, useAppDispatch } from 'hooks/useRedux';
import {
    incrementPaginationPage,
    decrementPaginationPage,
    selectPaginationPage
} from 'redux/reducers/paginationReducer';

import './Pagination.scss';

interface PaginationProps {
    itemsCount: number;
}

const Pagination: React.FC<PaginationProps> = ({ itemsCount }) => {
    const itemsPerPage = useAppSelector(
        (state) => state.paginationReducer.itemsPerPage
    );
    const currentPage = useAppSelector(
        (state) => state.paginationReducer.currentPage
    );
    const totalPages = Math.ceil(itemsCount / itemsPerPage);
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
                    <BsArrowLeftCircleFill
                        className="pagination__button-arrow"
                        size={30}
                        // color="#c80037"
                        onClick={handleDecrementPage}
                    />
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
                    <BsArrowRightCircleFill
                        className="pagination__button-arrow"
                        size={30}
                        // color="#c80037"
                        onClick={handleIncrementPage}
                    />
                )}
            </div>
        </div>
    );
};
export default Pagination;
