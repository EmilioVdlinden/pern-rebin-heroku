import {React, useState, useEffect} from 'react';
import Toggle from './Toggle';
import DataTable from 'react-data-table-component';
import { getTableData } from '../../../api/StatisticsApi';

const columns = [
	{
    id: 'location',
		name: 'LOCATION',
		selector: row => row.location,
	},
  {
    id: 'time',
		name: 'LAST SEEN',
		selector: row => row.time,
	},
  {
    id: 'distance',
		name: 'FILL LEVEL [%]',
		selector: row => row.distance,
		sortable: true
	},
  {
    id: 'temp',
		name: 'TEMPERATURE [°C]',
    selector: row => row.temp,
	},

];

const Measurements = ({customerId}) => {

  const [TableData, setTableData] = useState([]);


  /* async function getTableData() {
    try {
      const response = await axios.get(`http://localhost:5000/statistics/table/${customerId}`);
      setTableData(response.data);

    } catch (err) {
      console.log(err);
    }
  }*/

  useEffect(() => {
    getTableData(customerId).then(
      (response) =>{
        setTableData(response);
      });

      //getTableData();

  }, [customerId]);


  return (
    <div className='flex flex-col rounded-lg bg-white py-4 px-3 text-left shadow-md gap-y-10' style={{ gridColumn: "span 3", gridRow: "span 5" }}>
      <div className='flex justify-between items-center'>
        <span className='text-rebin-darkblue text-lg font-semibold'>Sensor measurements</span>
        <Toggle></Toggle>
      </div>
      <DataTable columns={columns} data={TableData}  pagination={false} paginationPerPage={5} highlightOnHover={true}/>
    </div>
  )
}

export default Measurements