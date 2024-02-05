import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/home.module.scss";
import logoImg from "../../../public/logo.png";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import Link from "next/link";

export default function SignUp() {
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
                    <form>
                        <Input placeholder="Your name" type="text" />
                        <Input placeholder="E-mail" type="text" />
                        <Input placeholder="Password" type="password" />
                        <Button type="submit" loading={false}>
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
