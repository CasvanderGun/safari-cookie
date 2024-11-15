import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { cookies } from "next/headers";


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h3>This page is not protected. You don't need a valid session cookie to access it.</h3>
        <Link href="/login">Login</Link> 
        <Link href="/protected">Protected</Link>
      </main>
    </div>
  );


}
