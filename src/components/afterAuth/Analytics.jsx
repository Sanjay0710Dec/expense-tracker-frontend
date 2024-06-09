import React from 'react'
import Input from '../utils/Input'
import Chart from 'react-apexcharts'
import { useAnalytics, useDebouncedYear } from '../../hooks/purchase'
function Analytics() {
  const[year,debouncedYear,setYear] = useDebouncedYear(1000);
  const[options,series]   = useAnalytics({setYear,debouncedYear});
    
  return (
    <div id='purchases-analytics-info-holder' className='pt-8 flex justify-center text-black '>
      <div id="flex-chart-center" className='min-w-[375px] w-[900px] flex items-center rounded-md  flex-col bg-white mb-3'>
      <Input id={'select-year-for-analytics'} label={'Select-year'} value={year} inputType={'text'} placeholder={'ex:2024'} reminder={"*"} title={'please fill this field'} onchange={(e) =>{
                           setYear(e.target.value);
           }} passwordType={''} setPasswordType={''}/>
          <div id="chart-tile" className='text-2xl font-semibold border border-black mt-7 shadow-md px-3 py-2 mx-1'>Month Wise Expenses in the year</div>
          <div id="chart-container" className='shadow-md px-2 py-1 w-[97%] border border-black mt-4 '>
              <Chart options={options} series={series} type='bar'  height={500}/>
          </div>
      </div>
       
    </div>
  )
}

export default Analytics
