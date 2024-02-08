import Head from "next/head";
import styles from "./styles.module.scss";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Header } from "../../components/Header";
import { FiUpload } from "react-icons/fi";
import { ChangeEvent, FormEvent, useState } from "react";
import { setUpAPIClient } from "../../services/api";
import { toast } from "react-toastify";

type ItemProps = {
    id: string;
    name: string;
};

interface CategoryProps {
    categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const [productUrl, setProductUrl] = useState("");
    const [productImage, setProductImage] = useState(null);

    const [categories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);

    function handleFile(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;

        const image = event.target.files[0];

        if (!image) return;

        if (image.type === "image/jpeg" || image.type === "image/png") {
            setProductImage(image);
            setProductUrl(URL.createObjectURL(event.target.files[0]));
        }
    }

    function handleChangeCategory(event) {
        setCategorySelected(event.target.value);
    }

    async function handleCreateProduct(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData();

            if (
                name === "" ||
                price === "" ||
                description === "" ||
                productImage === null
            ) {
                toast.warning("Fill in all fields!");
                return;
            }

            data.append("name", name);
            data.append("price", price);
            data.append("description", description);
            data.append("category_id", categories[categorySelected].id);
            data.append("file", productImage);

            const apiClient = setUpAPIClient();

            await apiClient.post("/product", data);

            toast.success("Product created!");
        } catch (error) {
            toast.error("Error on create product, try again!");
        }

        setName("");
        setPrice("");
        setDescription("");
        setProductImage(null);
        setProductUrl("");
    }

    return (
        <>
            <Head>
                <title>Pizzapp - New Product</title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>
                    <h1>New Product</h1>

                    <form
                        className={styles.form}
                        onSubmit={handleCreateProduct}
                    >
                        <label className={styles.fileLabel}>
                            <span>
                                <FiUpload size={25} color="#FFF" />
                            </span>

                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={handleFile}
                            />

                            {productUrl && (
                                <img
                                    className={styles.preview}
                                    src={productUrl}
                                    alt="Product image"
                                    width={240}
                                    height={240}
                                />
                            )}
                        </label>

                        <select
                            value={categorySelected}
                            onChange={handleChangeCategory}
                        >
                            {categories.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>

                        <input
                            type="text"
                            placeholder="Product name"
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Product price"
                            className={styles.input}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <textarea
                            placeholder="Product description"
                            className={styles.input}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <button className={styles.button} type="submit">
                            Create product
                        </button>
                    </form>
                </main>
            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (context) => {
    const apiClient = setUpAPIClient(context);

    const response = await apiClient.get("/category");

    return {
        props: {
            categoryList: response.data,
        },
    };
});
