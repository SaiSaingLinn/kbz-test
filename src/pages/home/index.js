import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { Link, useHistory, useLocation } from 'react-router-dom'
import AppBar from '../../components/appbar'
import Table from '../../components/dataTable'
import Sidebar from '../../components/sidebar'
import { db } from '../../firebase'
import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // fetch data from firebase
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "customers"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // handle delete
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "customers", id));
      setData(data?.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  // handle edit
  const handleEdit = async (id) => {
    history.push(`/addCustomer?id=${id}`)
  }

  const clickhandler = async (key, id) => {
    if (key === 'edit') {
      await handleEdit(id)
    } else {
      await handleDelete(id)
    }
  };

  //date filter
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [filterData, setFilterData] = useState(null)

  const handleDateFilter = () => {
    let startSec = new Date(startDate) / 1000
    let endSec = new Date(endDate) / 1000
    let startDateToStr = new Date(startSec * 1000).toLocaleDateString("en-US")
    let endDateToStr = new Date(endSec * 1000).toLocaleDateString("en-US")
    const filtered = data !== null && data?.filter(x => ((new Date(x?.timeStamp?.seconds * 1000).toLocaleDateString("en-US")) >= startDateToStr && (new Date(x?.timeStamp?.seconds * 1000).toLocaleDateString("en-US")) <= endDateToStr))
    setFilterData(filtered)
  }

  const handleClearDate = () => {
    setFilterData(null)
    setStartDate(null)
    setEndDate(null)
  }

  return (
    <section>
      <div className="container">
        <div style={{display: 'flex'}}>
          <Sidebar />
          <div className="content" style={{width: '100%', background: '#EEF1F7'}}>
            <AppBar />
            <div 
              className='content-body' 
              style={{
                boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 4%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 4px 0px',
                backgroundColor: '#FFF',
                margin: 20,
                padding: 20,
              }}
              >
                <div className="title">
                  <h4 style={{color: '#666'}}>Customers</h4>
                </div>
                <div className='date'>
                  <div className='date-input-wrap'>
                    <ReactDatePicker className='form-control' placeholderText='start date' selected={startDate} onChange={(date) => setStartDate(date)} />
                    <ReactDatePicker className='form-control' placeholderText='end date' selected={endDate} onChange={(date) => setEndDate(date)} />
                    {/* <input className='form-control' type="date" onChange={(e) => {setStartDate(e.target.value)}} /> */}
                    {/* <input className='form-control' type="date" onChange={(e) => {setEndDate(e.target.value)}} /> */}
                  </div>
                  <div className='date-btn'>
                    <button onClick={() => handleDateFilter()} className="primary">Search</button>
                    <button onClick={() => handleClearDate()} className="delete">Reset</button>
                  </div>
                </div>
                {
                  filterData === null ?
                  <Table data={data} click={clickhandler} /> :
                  <Table data={filterData} click={clickhandler} />
                }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
