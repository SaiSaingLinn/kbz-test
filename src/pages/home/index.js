import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AppBar from '../../components/appbar'
import Sidebar from '../../components/sidebar'
import { db } from '../../firebase'

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

  // handle search
  const handleSearch = (e) => {
    const searchVal = e.target.value
    console.log('e', e.target.value)
    const filtered = data !== null && data?.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(searchVal)));
    console.log('filtered', filtered)
    setData(filtered)
  }

  // console.log('data', data)

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
                <div className='search'>
                  <input type="text" onChange={(e) => handleSearch(e)} />
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Photo</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Birthday</th>
                        <th scope="col">Gender</th>
                        <th scope="col">NRC</th>
                        <th scope="col">CreatedAt</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    {
                      data?.length > 0 &&
                      <tbody>
                        {
                          data?.length > 0 &&
                          data?.map((x, i) => {
                            return(
                            <tr key={i}>
                              <td>
                                <img src={x?.photo} alt={x?.name} style={{width: '50px'}} />
                              </td>
                              <td>{x?.name}</td>
                              <td>{x?.email}</td>
                              <td>{x?.phone}</td>
                              <td>{x?.dob}</td>
                              <td>{x?.gender}</td>
                              <td>{x?.nrc}</td>
                              <td>{moment(x?.timeStamp?.seconds).format('MMMM Do YYYY, h:mm:ss a')}</td>
                              <td>
                                <button className='edit sm' type="button" onClick={() => handleEdit(x?.id)}>Edit</button>
                                <button className='delete sm' type='button' onClick={() => handleDelete(x?.id)}>Delete</button>
                              </td>
                            </tr>
                            )
                          })
                        }
                      </tbody>
                    }
                  </table>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
