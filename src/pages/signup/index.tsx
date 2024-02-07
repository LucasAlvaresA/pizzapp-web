import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/home.module.scss";
import logoImg from "../../../public/logo.png";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

export default function SignUp() {
    const { signUp } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleSignUp(event: FormEvent) {
        event.preventDefault();

        if (name === "" || email === "" || password === "") {
            toast.warning("Fill in all fields!");
            return;
        }

        setLoading(true);

        let data = {
            name,
            email,
            password,
        };

        await signUp(data);

        setLoading(false);
    }

    return (
        <>
            <Head>
                <title>Pizzapp - Sign up</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image
                    src={logoImg}
                    alt="Logo Pizzapp"
                    className={styles.logo}
                />
                <div className={styles.login}>
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSignUp}>
                        <Input
                            placeholder="Your name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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
                        <Button type="submit" loading={loading}>
                            Sign up
                        </Button>
                    </form>

                    <Link href="/">
                        <div className={styles.text}>
                            Already have an account?
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
