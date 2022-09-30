import { generateGeneralClassName } from 'util/className-generators';
import { useAppDispatch } from 'hooks/use-redux';
import { selectPaginationPage } from 'redux/reducers/pagination-reducer';

import React from 'react';

interface IPaginationNumberItemProps {
    numBtn: number;
    currentPage: number;
}

const PaginationNumberItem: React.FC<IPaginationNumberItemProps> = ({
    numBtn,
    currentPage
}) => {
    const dispatch = useAppDispatch();

    const handlePageChange = (numBtn: number) =>
        dispatch(selectPaginationPage(numBtn));

    return (
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
    );
};
export default PaginationNumberItem;
