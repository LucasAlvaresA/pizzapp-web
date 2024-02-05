import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/home.module.scss";
import logoImg from "../../public/logo.png";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function Home() {
    return (
        <>
            <Head>
                <title>Pizzapp - Login</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image
                    src={logoImg}
                    alt="Logo Pizzapp"
                    className={styles.logo}
                />
                <div className={styles.login}>
                    <form>
                        <Input placeholder="E-mail" type="text" />
                        <Input placeholder="Password" type="password" />
                        <Button type="submit" loading={false}>
                            Login
                        </Button>
                    </form>
                    <a className={styles.text}>Don't have an account?</a>
                </div>
            </div>
        </>
    );
}
