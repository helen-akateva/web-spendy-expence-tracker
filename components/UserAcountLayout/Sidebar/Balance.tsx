"use client";

import styles from "./Balance.module.css";
import { useFinanceStore } from "@/lib/stores/financeStore";

const Balance = () => {
	const { balance } = useFinanceStore();
	return (
		<div className={styles.balanceContainer}>
			{" "}
			<h3 className={styles.title}>YOUR BALANCE</h3>
			<p className={styles.value}>{balance.toFixed(2)} UAH</p>
		</div>
	);
};

export default Balance;
