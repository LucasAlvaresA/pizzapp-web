import styles from "./styles.module.scss";
import Link from "next/link";
import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";

export function Header() {
    const { signOut } = useContext(AuthContext);

    return (
        <header className={styles.container}>
            <div className={styles.content}>
                <Link href="/dashboard" className={styles.logo}>
                    <div className={styles.logoName}>Pizzapp</div>
                    <img src="/logo.png" width={60} height={60} />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href="/category">
                        <div>Category</div>
                    </Link>

                    <Link href="/product">
                        <div>Product</div>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color="#FFF" size={24} />
                    </button>
                </nav>
            </div>
        </header>
    );
}
