import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/home.module.scss";
import logoImg from "../../public/logo.png";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import Link from "next/link";

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
                    <h1>Login</h1>
                    <form>
                        <Input placeholder="E-mail" type="text" />
                        <Input placeholder="Password" type="password" />
                        <Button type="submit" loading={false}>
                            Login
                        </Button>
                    </form>

                    <Link href="/signup">
                        <div className={styles.text}>
                            Don't have an account?
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
