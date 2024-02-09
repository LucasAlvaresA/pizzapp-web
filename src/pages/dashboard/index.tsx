import Head from "next/head";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";
import { FiRefreshCcw } from "react-icons/fi";
import { setUpAPIClient } from "../../services/api";
import { useState } from "react";
import Modal from "react-modal";
import { api } from "../../services/apiClient";
import { ModalOrder } from "../../components/ModalOrder";

type OrderType = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
};

interface HomeProps {
    orders: OrderType[];
}

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product: {
        id: string;
        name: string;
        description: string;
        price: string;
        banner: string;
    };
    order: {
        id: string;
        table: string | number;
        status: boolean;
        name: string | null;
    };
};

export default function Dashboard({ orders }: HomeProps) {
    const [orderList, setOrderList] = useState(orders || []);
    const [modalItem, setModalItem] = useState<OrderItemProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    async function handleOpenModal(id: string) {
        const response = await api.get("/order/detail", {
            params: {
                order_id: id,
            },
        });

        setModalItem(response.data);
        setModalVisible(true);
    }

    function handleModalClose() {
        setModalVisible(false);
    }

    async function handleFinishOrder(id: string) {
        await api.put("/order/finish", {
            order_id: id,
        });

        const response = await api.get("/orders");
        setOrderList(response.data);

        setModalVisible(false);
    }

    async function handleRefresh() {
        const response = await api.get("/orders");
        setOrderList(response.data);
    }

    Modal.setAppElement("#__next");

    return (
        <>
            <Head>
                <title>Pizzapp - Dashboard</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <div className={styles.header}>
                        <h1> Last orders</h1>
                        <button onClick={handleRefresh}>
                            <FiRefreshCcw color="#3fffa3" size={25} />
                        </button>
                    </div>

                    <article className={styles.listOrder}>
                        {orderList.length === 0 && (
                            <span className={styles.emptyList}>
                                No orders were found
                            </span>
                        )}

                        {orderList.map((item) => {
                            return (
                                <section
                                    className={styles.orderItem}
                                    key={item.id}
                                    onClick={() => handleOpenModal(item.id)}
                                >
                                    <button>
                                        <div className={styles.tag}></div>
                                        <span>Table {item.table}</span>
                                    </button>
                                </section>
                            );
                        })}
                    </article>
                </main>

                {modalVisible && (
                    <ModalOrder
                        isOpen={modalVisible}
                        onClose={handleModalClose}
                        order={modalItem}
                        handleFinishOrder={handleFinishOrder}
                    />
                )}
            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (context) => {
    const apiClient = setUpAPIClient(context);

    const response = await apiClient.get("/orders");

    return {
        props: {
            orders: response.data,
        },
    };
});
