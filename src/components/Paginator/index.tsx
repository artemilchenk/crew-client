import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Paginator.module.scss";

export const Paginator = ({count}) => {
  const [pageParams, setPageParams] = useSearchParams({});
  const rang = 3;
  const [currentPage, setCurrentPage] = useState(pageParams.get('skip') && Number(pageParams.get('skip')) / 10 + 1 || 1)
  const pageCount = Math.ceil(count / 10);
  const [span, setSpan] = useState(5);

    useEffect(() => {

      if (currentPage > 1) {
        pageParams.set('skip', `${(currentPage - 1) * 10}`)
        setPageParams(pageParams)
      } else {
        pageParams.delete('skip')
        setPageParams(pageParams)
      }

      if ((currentPage - 1) <= rang) {
        setSpan(2 + (rang - (currentPage - 1)));
      } else if ((currentPage - 1) >= (pageCount - 1 - rang)) {
        setSpan(2 + ((currentPage - 1) - (pageCount - 1 - rang)));
      } else setSpan(rang - 1);

    }, [currentPage])

    useEffect(() => {
      if (!Number(pageParams.get('skip'))) {
        setCurrentPage(1)
      }
    }, [pageParams])

  return (
    <div className={styles.paginator}>
      <div>
        <p>
          Showing
          <span>{count ? ((currentPage - 1) * 10) + 1 : 0}</span>to
          <span>{count < currentPage * 10 ? currentPage * 10 - (currentPage * 10 - count) : currentPage * 10 || 0}</span>of
          <span>{count || 0}</span>results</p>
      </div>
      <div>
        <nav className={styles.paginator__nav}
             aria-label="Pagination">

          <div className={styles.paginator__direction} onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}>
            <span>Previous</span>
          </div>

          {Array(pageCount || 1).fill(null).map((item, index) => (
            <div
              style={{ backgroundColor: currentPage - 1 === Number(index) ? "#282C33" : "inherit" }}
              id={String(index)}
              key={index} className={styles.paginator__item}
              hidden={(index > currentPage - 1 + span && index !== pageCount - 1) || (index < currentPage - 1 - span && index !== 0)}
              onClick={(e) => {

                if (!((index === currentPage - 1 + span && index !== pageCount - 1) || (index === currentPage - 1 - span && index !== 0))) {

                  setCurrentPage(index + 1);
                }

              }}>{index === currentPage - 1 + span && index !== pageCount - 1
              ? (<div>
                <div style={{ opacity: 0 }}>0</div>
                <div className={styles.paginator__dots}>...</div>
              </div>)
              : index === currentPage - 1 - span && index !== 0 ? <div>
                <div style={{ opacity: 0 }}>0</div>
                <div className={styles.paginator__dots}>...</div>
              </div> : index + 1}
            </div>
          ))}
          <div className={styles.paginator__direction} onClick={() => {
            if (currentPage < pageCount) {
              setCurrentPage(currentPage + 1);
            }
          }}>
            <span>Next</span>
          </div>

        </nav>
      </div>
    </div>
  );
};


/*  <div className={'flex flex-wrap justify-center px-5 max-w-6xl mr-auto ml-auto'}>
      {posts?.map((post, index) => {
        return (
          <div>{index}</div>
        )
      })}
    </div>*/


