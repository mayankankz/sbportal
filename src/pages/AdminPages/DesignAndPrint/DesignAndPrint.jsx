import React, { useEffect, useState } from 'react'
import './DesignAndPrint.scss'
import DropDown from '../../../components/DropDown/DropDown'
import { BASEPATH } from '../../../config';
import axios from 'axios';
import { classes, schoolcolumns, schoolrows } from '../../../data'
export const DesignAndPrint = () => {

  const [schools, setSchools] = useState([])
  const [school, setSchool] = useState('')
  const [classValue, setClassValue] = useState('')
  const [year, setYear] = useState('')
  const [loading, setLoading] = useState(false)
  async function fetchSchools() {
    setLoading(true);
    axios.get(`${BASEPATH}user/getallschools`).then((response) => {

      setSchools(response.data.schools.map((school) => {
        return { "label": school.schoolname, "value": school.schoolname }
      }))
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    })
  }

  useEffect(() => {
    fetchSchools()
  }, [])

  return (
    <div className="design-and-print">
      <div className="manucontainer">

        <div className="dropdown">
          <DropDown label={"School"} value={school} options={schools} onChange={setSchool} />
        </div>

        <div className="dropdown">
          <DropDown label={"Class"} value={classValue} options={classes} onChange={setClassValue} />
        </div>

       
      </div>


      <div className="designmain">
        <div className="left">
          <h1>Coming Soon</h1>
        </div>
        <div className="right">
        
        </div>
      </div>


    </div>
  )
}
