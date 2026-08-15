const Modal = ({ children, isOpen, onClose, title = "Modal test" }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-title">
          <h3>{title}</h3>
          <button  type="button" className="button" onClick={onClose}>
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
