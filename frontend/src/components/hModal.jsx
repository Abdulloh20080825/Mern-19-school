import { CgClose } from 'react-icons/cg';
import Modal from 'react-modal';

const HModal = ({ isOpen, onClose, children }) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			className='fixed inset-0 flex items-center justify-center z-50'
			overlayClassName='fixed inset-0 bg-black bg-opacity-50 z-40'
		>
			<div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-md'>
				<button
					onClick={onClose}
					className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition'
				>
					<CgClose className='w-10 h-10 text-white font-extrabold' />
				</button>
				{children}
			</div>
		</Modal>
	);
};

export default HModal;
