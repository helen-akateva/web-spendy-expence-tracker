"use client";

import css from "./TransactionsItem.module.css";
import { GoPencil } from "react-icons/go";
import { useEffect, useState } from "react";
import { ModalType } from "@/app/(dashboard)/transactions/page";
import { Transaction } from "@/lib/api/transactions";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

interface Props {
  setModalType: (value: ModalType) => void;
  data: Transaction[];
}

const TransactionItem = ({ setModalType, data }: Props) => {
  const isMobile = useMediaQuery("(max-width: 767.9px)");

  console.log(data);

  return (
    <>
      {isMobile && (
        <div className={css.transactionPage}>
          {data.map(({ _id, date, type, category, comment, amount }) => (
            <div className={css.tableWrapper} key={_id}>
              <table
                className={`${css.transactionTable} ${type === "income" ? css.greenBefore : ""}`}
              >
                <thead className={css.thead}>
                  <tr className={css.tr}>
                    <th className={css.th}>Date</th>
                    <th className={css.th}>Type</th>
                    <th className={css.th}>Category</th>
                    <th className={css.th}>Comment</th>
                    <th className={css.th}>Sum</th>

                    <th className={`${css.th} ${css.deleteCol}`}>
                      <button className={css.btnDelete}>Delete</button>
                    </th>
                  </tr>
                </thead>

                <tbody className={css.tbody}>
                  <tr key={_id} className={`${css.tr} ${css.valueTr}`}>
                    <td className={css.td}>
                      <p>{date}</p>
                    </td>
                    <td className={css.td}>
                      <p>{type}</p>
                    </td>
                    <td className={css.td}>
                      <p>{category.name}</p>
                    </td>
                    <td className={css.td}>
                      <p>{comment}</p>
                    </td>
                    <td
                      className={css.td}
                      style={{
                        color: type === "income" ? `${"#24cca7"}` : "yellow",
                      }}
                    >
                      <p>{amount}</p>
                    </td>
                    <td className={`${css.td} ${css.editTd}`}>
                      <p>
                        <GoPencil className={css.editIcon} /> Edit
                      </p>
                    </td>
                    <td
                      className={`${css.td} ${css.deleteCol} ${css.tabletBtnDelete}`}
                    >
                      <button className={css.btnDelete}>Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                className={css.button}
                onClick={() => setModalType("add")}
              >
                <svg className={css.icon} width="25" height="25">
                  <use href="/sprite.svg#icon-plus" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
      {!isMobile && (
        <div className={`${css.transactionPage}`}>
          <div className={css.tableWrapper}>
            <table className={`${css.transactionTable} ${css.scroll}`}>
              <thead className={`${css.thead} `}>
                <tr className={css.tr}>
                  <th className={css.th}>Date</th>
                  <th className={css.th}>Type</th>
                  <th className={css.th}>Category</th>
                  <th className={css.th}>Comment</th>
                  <th className={css.th}>Sum</th>

                  <th className={`${css.th} ${css.deleteCol}`}>
                    <button className={css.btnDelete}>Delete</button>
                  </th>
                </tr>
              </thead>

              <tbody className={`${css.tbody}`}>
                {data.map(({ _id, date, type, category, comment, amount }) => (
                  <tr key={_id} className={`${css.tr} ${css.valueTr} `}>
                    <td className={css.td}>
                      <p>{date}</p>
                    </td>
                    <td className={css.td}>
                      <p>{type}</p>
                    </td>
                    <td className={css.td}>
                      <p>{category.name}</p>
                    </td>
                    <td className={css.td}>
                      <p>{comment}</p>
                    </td>
                    <td className={`${css.td} ${_id}`}>
                      <p>{amount}</p>
                    </td>
                    <td className={`${css.td} ${css.editTd}`}>
                      <p>
                        <GoPencil className={css.editIcon} />
                      </p>
                    </td>
                    <td
                      className={`${css.td} ${css.deleteCol} ${css.tabletBtnDelete}`}
                    >
                      <button className={css.btnDelete}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className={css.button} onClick={() => setModalType("add")}>
              <svg className={css.icon} width="25" height="25">
                <use href="/sprite.svg#icon-plus" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionItem;
