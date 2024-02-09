import { OrderItemProps } from "../../pages/dashboard";
import styles from "./style.module.scss";
import { FiX } from "react-icons/fi";
import Modal from "react-modal";

interface ModalOrderProps {
    isOpen: boolean;
    onClose: () => void;
    order: OrderItemProps[];
    handleFinishOrder: (id: string) => void;
}

export function ModalOrder({
    isOpen,
    onClose,
    order,
    handleFinishOrder,
}: ModalOrderProps) {
    const customStyles = {
        content: {
            top: "50%",
            bottom: "auto",
            left: "50%",
            rigth: "auto",
            padding: "30px",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#1d1d2e",
            minWidth: "330px",
            maxWidth: "620px",
            overflow: "hidden",
        },
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
            <button
                type="button"
                onClick={onClose}
                className="react-modal-close"
                style={{
                    background: "transparent",
                    border: 0,
                }}
            >
                <FiX size={45} color="#f34748" />
            </button>

            <div className={styles.container}>
                <h2>Order details</h2>
                <span className={styles.table}>
                    Table: <strong>{order[0].order.table}</strong>
                </span>

                {order.map((item) => (
                    <section key={item.id} className={styles.containerItem}>
                        <span>
                            {item.amount} <strong>{item.product.name}</strong>
                        </span>
                        <span className={styles.description}>
                            {item.product.description}
                        </span>
                    </section>
                ))}

                <button
                    className={styles.buttonOrder}
                    onClick={() => handleFinishOrder(order[0].order_id)}
                >
                    Finish order
                </button>
            </div>
        </Modal>
    );
}
