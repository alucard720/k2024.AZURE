import React, { useEffect, useState } from 'react';


function DashboardCard10() {

  const [users, setUsers] = useState([])


  useEffect(()=>{
    getAllusers();
  },[])



  const getAllusers = async ()=>{
    let result = await fetch('http://localhost:5000/users',{
      headers:{
        authorization:JSON.parse(localStorage.getItem('token'))
      }
    })
    result= await result.json();
    setUsers(result);
    console.log(result);
  }

 
  return (
    <div className="col-span-full xl:col-span-20 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Usuarios</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-hidden">
          <table className="table table-responsive">
            {/* Table header */}
            <thead>
              <tr>
              {/*   <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Nombre</div>
                </th> */}
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Contrasena</div>
                </th>
             {/*    <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Spent</div>
                </th> */}
              
              </tr>
            </thead>
            {/* Table body */}

            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
            {
              users.length ? users.map((item, index) => {
                  return(
                    <tr key={item.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
{/*                             <img className="rounded-full" src={customer.image} width="40" height="40" alt={customer.name} />
 */}                          </div>
                          <div className="font-medium text-slate-800 dark:text-slate-100">{item.email}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{item.password}</div>
                      </td>
                    {/*   <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{customer.spent}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{customer.location}</div>
                      </td> */}
                    </tr>
                  )
                }): null
              }

            
            </tbody>
          
          </table>

        </div>

      </div>
    </div>
  );
}

export default DashboardCard10;
