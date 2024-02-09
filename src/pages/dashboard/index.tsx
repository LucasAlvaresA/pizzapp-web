import Head from "next/head";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";
import { FiRefreshCcw } from "react-icons/fi";
import { setUpAPIClient } from "../../services/api";
import { useState } from "react";

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

export default function Dashboard({ orders }: HomeProps) {
    const [orderList] = useState(orders || []);

    function handleOpenModal(id: string) {}

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
                        <button>
                            <FiRefreshCcw color="#3fffa3" size={25} />
                        </button>
                    </div>

                    <article className={styles.listOrder}>
                        {orderList.map((item) => {
                            return (
                                <section
                                    className={styles.orderItem}
                                    key={item.id}
                                >
                                    <button
                                        onClick={() => handleOpenModal(item.id)}
                                    >
                                        <div className={styles.tag}></div>
                                        <span>Table {item.table}</span>
                                    </button>
                                </section>
                            );
                        })}
                    </article>
                </main>
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
