import { useState } from 'react';
import {
    BsFillArrowDownCircleFill,
    BsFillArrowUpCircleFill
} from 'react-icons/bs';

import Button from 'shared/form/Button';

import './Accordion.scss';

interface IAccordionProps {
    contentType: 'pizzaIngredients' | 'cartIngredients' | 'addresses';
    items: any[];
    title: string;
}

const Accordion: React.FC<IAccordionProps> = ({ title, items }) => {
    const [showAccordion, setShowAccordion] = useState(false);

    const handleToggleAccordion = () =>
        setShowAccordion((prevShowState) => !prevShowState);

    const arrowButton = showAccordion ? (
        <BsFillArrowUpCircleFill className="accordion__arrow-icon" />
    ) : (
        <BsFillArrowDownCircleFill className="accordion__arrow-icon" />
    );

    return (
        <div className="accordion">
            <header className="accordion__header">
                <Button type="button" width="100%" secondary>
                    <div
                        className="accordion__button-content"
                        onClick={handleToggleAccordion}
                    >
                        <div className="">
                            <p>{title}</p>
                        </div>{' '}
                        <div>{arrowButton}</div>
                    </div>
                </Button>
            </header>

            <div
                className={`accordion__content ${
                    showAccordion ? 'accordion__content--show' : ''
                }`}
            >
                <p>111111111111111</p>
                <p>222222222222222</p>
                <p>33333333</p>
            </div>
        </div>
    );
};
export default Accordion;
