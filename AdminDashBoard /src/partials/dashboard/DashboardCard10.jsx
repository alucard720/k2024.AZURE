import React from 'react';


function DashboardCard10() {

 
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
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Nombre</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Lugar </div>
                </th>
             {/*    <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Spent</div>
                </th> */}
              
              </tr>
            </thead>
            {/* Table body */}
          
          </table>

        </div>

      </div>
    </div>
  );
}

export default DashboardCard10;
