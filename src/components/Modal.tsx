import "./Modal.css";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Button from "./Button";

interface IModalProps {
   isOpen: boolean;
   closeModal: () => void;
   children: React.ReactNode;
}

const MUIModal: React.FC<IModalProps> = ({ isOpen, closeModal, children }) => {
   return (
         <Modal
            open={isOpen}
            onClose={closeModal}
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            style={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
            }}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
         >
             <div style={{ position: "relative" }}>
                <Button
                    label="x"
                    className="close-btn"
                    onClick={closeModal}
                />
                <div className="content">
                    {children}
                </div>
            </div>
         </Modal>
   );
};

export default MUIModal;
