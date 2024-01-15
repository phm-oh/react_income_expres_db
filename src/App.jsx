import { useState ,useEffect ,useRef} from 'react'
import ShowIncom from './components/showIncom'
import AddTransection from './components/addTransection'
import axios from 'axios'



import './App.css'


function App() {
  const balanceRef = useRef(null);
  const mplusRef = useRef(null);
  const mminusRef = useRef(null);
  const formRef = useRef(null);
  const textRef = useRef(null);
  const amountRef = useRef(null);


  const [transactions , setTransactions ] = useState([])
  const [textValue, setTextValue] = useState('');
  const [amountValue, setAmountValue] = useState('');


  const fetchData = async()=>{

    try {

    const resData = await axios.get('http://127.0.0.1:3000/income')
     if(resData.data){
         setTransactions(resData.data)
         
     }else {
      console.error('Failed to fetch data:', resData.status)
  }
      
    } catch (error) {
      console.error('Error fetching data:', error)
    }
     
  }




const addDataToList= (transactions)=>{
  
  setTransactions(prevTransactions => [...prevTransactions, transactions]);
  
  

  // const deleteButton = document.createElement('button');
  //   deleteButton.textContent = 'x';
  //   deleteButton.classList.add('delete-btn');
  //   deleteButton.addEventListener('click', async () => {
  //       try {
  //           await axios.delete(`http://127.0.0.1:3000/income/${transactions.id}`);
  //           console.log('ลบข้อมูลเรียบร้อย');
  //           init();
  //           // ทำสิ่งที่ต้องการหลังจากลบข้อมูล
  //       } catch (error) {
  //           console.error('เกิดข้อผิดพลาดในการลบข้อมูล:', error);
  //           // จัดการข้อผิดพลาดที่เกิดขึ้น
  //       }  
  //   });
   
}

const removeData= async(id) =>{
  try {
    await axios.delete(`http://127.0.0.1:3000/income/${id}`);
    console.log('ลบข้อมูลเรียบร้อย');
    fetchData(); // ดึงข้อมูลใหม่หลังจากลบ
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการลบข้อมูล:', error);
  }
}


const calculateMoney =() =>{
  const amounts = transactions.map(transactions => transactions.amount); //map
  // console.log(amounts);

  //คำนวนยอดคงเหลือ
  const total = amounts.reduce((result, i) => (result += i), 0).toFixed(2);
  console.log(total);

  //คำนวนรายรับ
  const income = amounts.filter(i => i > 0).reduce((result, i) => (result += i), 0).toFixed(2);
  console.log(income);

  //คำนวนรายจ่าย
  const expense = Math.abs(amounts.filter(i => i < 0).reduce((result, i) => (result += i), 0)).toFixed(2);
  console.log(expense);

  balanceRef.current.innerText = `฿${formatNumber(total)}`;
  mplusRef.current.innerText = `฿${formatNumber(income)}`;
  mminusRef.current.innerText = `฿${formatNumber(expense)}`;
}

const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

const addTransaction = async(e)=> {
  e.preventDefault();
  if (textRef.current.value.trim() === '' || amountRef.current.value.trim() === '') {
      alert("กรุณากรอกข้อมูลให้ครบ");
  } else {

    try {
      await axios.post('http://127.0.0.1:3000/income',{
        id: autoID(),
        text: textRef.current.value,
        amount: Number.parseFloat(amountRef.current.value)
    })
    fetchData(); 
    textRef.current.value = '';
    amountRef.current.value = '';

    } catch (error) {
      console.error('Error adding transaction:', error);
    }
      
    
  }
}

function autoID() {
  return Math.floor(Math.random() * 1000000)
}






useEffect(() => {
  fetchData();
  calculateMoney()
  
}, []);

useEffect(() => {
  console.log(transactions);
  calculateMoney()
}, [transactions]);





  return (
    <>
    
    <div className='container'>
    <h2>โปรแกรมบัญชีรายรับ รายจ่าย</h2>
          <ShowIncom mplusRef={mplusRef} 
             mminusRef={mminusRef} 
             balanceRef={balanceRef}
           />
           
          <ul id="list" className="list">
          {transactions.map(transaction => (
            <li key={transaction.id} className={transaction.amount < 0 ? 'minus' : 'plus'}>
              <h4>{transaction.text}</h4>
              <span>{transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)}</span>
              <button className="delete-btn" onClick={() => removeData(transaction.id)}>
                  X
            </button>
            </li>
          ))}
        </ul>

        <AddTransection 
           formRef={formRef}  
           textRef={textRef} 
           amountRef={amountRef}
           onAddTransaction={addTransaction}
          />
      
    </div>
    </>
  )
}

export default App
