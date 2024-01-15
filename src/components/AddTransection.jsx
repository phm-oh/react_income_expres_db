
import React, { useRef } from 'react';

const AddTransection = ({formRef,textRef,amountRef ,onAddTransaction}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTransaction(e);
  };



  return (
    <>
    
    <h3>เพิ่มธุรกรรม</h3>
    <form onSubmit={handleSubmit} ref={formRef}>
        <div className="form-control">
            <label htmlFor="inputField">ชื่อธุรกรรม</label>
            <input type="text" ref={textRef} placeholder="ระบุรายการธุรกรรม"/>
        </div>
        <div className="htmlForm-control">
            <label htmlFor="inputField">จำนวนเงิน <br/>
                (+ รายรับ) , (- รายจ่าย)</label>
            <input type="number" ref={amountRef} placeholder="ระบุจำนวนเงิน"/>
        </div>
        <button className="btn" type="submit" id="submit"> เพิ่มธุรกรรม</button>

    </form>
    </>
  )
}

export default AddTransection