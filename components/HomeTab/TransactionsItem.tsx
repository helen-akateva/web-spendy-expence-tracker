"use client";

import css from "./TransactionsItem.module.css";
import { GoPencil } from "react-icons/go";
import { useEffect, useState } from "react";

interface Props {
  setIsModalOpen: (value: boolean) => void;
}

const data = [
  {
    id: 1,
    date: "04.01.2024",
    type: "-",
    category: "Other",
    comment: "Gift for your wife",
    sum: 300,
  },
  {
    id: 2,
    date: "05.01.2024",
    type: "-",
    category: "Salary",
    comment: "Monthly salary",
    sum: 2000,
  },
  {
    id: 3,
    date: "04.01.2024",
    type: "+",
    category: "Other",
    comment: "Gift for your wife",
    sum: 300,
  },
  {
    id: 4,
    date: "05.01.2024",
    type: "+",
    category: "Salary",
    comment: "Monthly salary",
    sum: 2000,
  },
  {
    id: 5,
    date: "04.01.2024",
    type: "-",
    category: "Other",
    comment: "Gift for your wife",
    sum: 300,
  },
  {
    id: 6,
    date: "05.01.2024",
    type: "+",
    category: "Salary",
    comment: "Monthly salary",
    sum: 2000,
  },
  {
    id: 7,
    date: "04.01.2024",
    type: "-",
    category: "Other",
    comment: "Gift for your wife",
    sum: 300,
  },
  {
    id: 8,
    date: "05.01.2024",
    type: "+",
    category: "Salary",
    comment: "Monthly salary",
    sum: 2000,
  },
  {
    id: 9,
    date: "04.01.2024",
    type: "-",
    category: "Other",
    comment: "Gift for your wife",
    sum: 300,
  },
  {
    id: 10,
    date: "05.01.2024",
    type: "+",
    category: "Salary",
    comment: "Monthly salary",
    sum: 2000,
  },
  {
    id: 11,
    date: "04.01.2024",
    type: "-",
    category: "Other",
    comment: "Gift for your wife",
    sum: 300,
  },
  {
    id: 12,
    date: "05.01.2024",
    type: "+",
    category: "Salary",
    comment: "Monthly salary",
    sum: 2000,
  },
];

const TransactionItem = ({ setIsModalOpen }: Props) => {
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (width === 0) return null;

  return (
    <>
      {width <= 767 ? (
        <div className={css.transactionPage}>
          {data.map(({ id, date, type, category, comment, sum }) => (
            <div className={css.tableWrapper} key={id}>
              <table
                className={`${css.transactionTable} ${type === "+" ? css.greenBefore : ""}`}
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
                  <tr
                    key={id}
                    className={`${css.tr} ${css.valueTr} ${id % 2 === 0 ? css.colorize : ""}`}
                  >
                    <td className={css.td}>
                      <p>{date}</p>
                    </td>
                    <td className={css.td}>
                      <p>{type}</p>
                    </td>
                    <td className={css.td}>
                      <p>{category}</p>
                    </td>
                    <td className={css.td}>
                      <p>{comment}</p>
                    </td>
                    <td
                      className={css.td}
                      style={{
                        color: type === "+" ? `${"#24cca7"}` : "yellow",
                      }}
                    >
                      <p>{sum}</p>
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
                onClick={() => setIsModalOpen(true)}
              >
                <svg className={css.icon} width="25" height="25">
                  <use href="/sprite.svg#icon-plus" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
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
                {data.map(({ id, date, type, category, comment, sum }) => (
                  <tr
                    key={id}
                    className={`${css.tr} ${css.valueTr} ${id % 2 === 0 ? css.colorize : ""}`}
                  >
                    <td className={css.td}>
                      <p>{date}</p>
                    </td>
                    <td className={css.td}>
                      <p>{type}</p>
                    </td>
                    <td className={css.td}>
                      <p>{category}</p>
                    </td>
                    <td className={css.td}>
                      <p>{comment}</p>
                    </td>
                    <td className={`${css.td} ${id}`}>
                      <p>{sum}</p>
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
            <button className={css.button} onClick={() => setIsModalOpen(true)}>
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
