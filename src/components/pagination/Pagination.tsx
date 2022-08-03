import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

import './Pagination.scss';

interface PaginationProps {
    itemsCount: number;
}

const Pagination: React.FC<PaginationProps> = ({ itemsCount }) => {
    console.log('items count', itemsCount);

    const itemsPerPage = 4;
    const totalPages = Math.ceil(itemsCount / itemsPerPage);
    console.log('totalPages', totalPages);

    const numberButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

    console.log('numberButtons', numberButtons);

    return (
        <div className="pagination">
            <div className="pagination__controls">
                <BsArrowLeftCircleFill
                    size={30}
                    color="#c80037"
                    className="pagination__button-arrow"
                />
                <ul className="pagination__numbers-list">
                    {numberButtons.map((numBtn) => (
                        <li key={numBtn} className="pagination__numbers-item">
                            {numBtn}
                        </li>
                    ))}
                </ul>
                <BsArrowRightCircleFill
                    size={30}
                    color="#c80037"
                    className="pagination__button-arrow"
                />
            </div>
        </div>
    );
};
export default Pagination;
