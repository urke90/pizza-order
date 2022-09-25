import { generateGeneralClassName } from 'util/classGenerators';
import './LoadingSpinner.scss';

interface ILoadingSpinner {
    asOverlay?: boolean;
}

const LoadingSpinner: React.FC<ILoadingSpinner> = ({ asOverlay }) => {
    return (
        <div
            className={`loader__wrapper ${generateGeneralClassName(
                !!asOverlay,
                'loader__overlay'
            )}`}
        >
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};
export default LoadingSpinner;
