
import React, { useRef } from 'react';

const ShowIncom = ({ mplusRef, mminusRef ,balanceRef , listRef}) => {
  return (
    <>
    <h4 className="balanceText">ยอดคงเหลือ (บาท)</h4>
    <h1 className="balance" ref={balanceRef}>฿0.00</h1>
      <div className="income-expense-container">
        <div className="show-income">
          <h4>รายรับ</h4>
          <p ref={mplusRef} className="money plus">0</p>
        </div>
        <div>
          <h4>รายจ่าย</h4>
          <p ref={mminusRef} className="money minus">0</p>
        </div>
      </div>

      <h3>ประวัติธุรกรรม</h3>
      <ul ref={listRef} className="list"></ul>
    </>
  );
};

export default ShowIncom;
