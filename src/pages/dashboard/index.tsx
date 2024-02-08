import Head from "next/head";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";
import { FiRefreshCcw } from "react-icons/fi";

export default function Dashboard() {
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
                        <section className={styles.orderItem}>
                            <button>
                                <div className={styles.tag}></div>
                                <span>Table 30</span>
                            </button>
                        </section>
                    </article>
                </main>
            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (context) => {
    return {
        props: {},
    };
});
