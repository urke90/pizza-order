import './Backdrop.scss';

interface IBackdropProps {
    onClose: () => void;
}

const Backdrop: React.FC<IBackdropProps> = ({ onClose }) => {
    return <div className="backdrop" onClick={onClose}></div>;
};

export default Backdrop;
