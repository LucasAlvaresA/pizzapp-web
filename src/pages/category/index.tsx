import Head from "next/head";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";
import { FormEvent, useState } from "react";
import { api } from "../../services/apiClient";
import { setUpAPIClient } from "../../services/api";
import { toast } from "react-toastify";

export default function Category() {
    const [name, setName] = useState("");

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if (name === "") {
            return;
        }

        await api.post("/category", {
            name: name,
        });

        toast.success("Category created successfully!");
        setName("");
    }

    return (
        <>
            <Head>
                <title>Pizzapp - Category</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <h1>Create a new category</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder="Category name"
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <button className={styles.button} type="submit">
                            Create
                        </button>
                    </form>
                </main>
            </div>
        </>
    );
}
