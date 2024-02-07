import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/home.module.scss";
import logoImg from "../../public/logo.png";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
    const { signIn } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(event: FormEvent) {
        event.preventDefault();

        let data = {
            email,
            password,
        };
        await signIn(data);
    }

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
                    <form onSubmit={handleLogin}>
                        <Input
                            placeholder="E-mail"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
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
