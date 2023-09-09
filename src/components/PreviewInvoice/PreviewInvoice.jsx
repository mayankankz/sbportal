import React from 'react'
import './preview.scss'
import { Divider } from '@mui/material'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import { CurrencyRupeeOutlined } from '@mui/icons-material';

import numberToWords from 'number-to-words';
export const PreviewInvoice = ({ printref, items, taxes, billto,invoiceDates,amountdetails,gstBill,showGst }) => {

  return (
    <div className="previewContainer" ref={printref}>

      <div className="previewHeader">
        <div className="left">
          <div className="logoimg">
            <img src="/img/1.png" alt="" />
            <div className="name">
              <span style={{ fontWeight: 'bold', color: '#e31616' }}>SB ONLINE</span><span style={{ color: '#fff' }}> Services</span>

            </div>
          </div>
        </div>
        <div className="right">
          <div className="infos">
            <div className="info">
              <div className="infoleft">
                <LocalPhoneOutlinedIcon color='#fff' />
              </div>
              <Divider orientation="vertical" flexItem />
              <div className="inforight">
                9584730838,<br />
                7415413133
              </div>
            </div>

            <div className="info">
              <div className="infoleft">
                <AlternateEmailIcon />
              </div>
              <Divider orientation="vertical" flexItem />
              <div className="inforight">
                SBONLINESERVICESGAR@GMAIL.COM
              </div>
            </div>

            <div className="info">
              <div className="infoleft">
                <AddLocationAltOutlinedIcon />
              </div>
              <Divider orientation="vertical" flexItem />
              <div className="inforight">
                Near TVS Showroom,<br />
                Hospital Road,<br />
                Gadarwara, 487551<br />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="invoiceBasicInfo">
        <div className="invoiceto">
          <p>INVOICE TO:</p>
          {billto?.name && <span style={{ fontSize: '22px', fontWeight: '600' }}>{billto?.name}</span>}
          {billto?.companyname && <span className="company">{billto.companyname}</span>}

          <div className="toInfo">

            {billto?.mobile && <div className="maininfo">
              <label htmlFor="phone">Phone : </label>
              <span>{billto?.mobile}</span>
            </div>}

            {billto?.email && <div className="maininfo">
              <label htmlFor="Email">Email : </label>
              <span>{billto?.email}</span>
            </div>}

            {billto?.address && <div className="maininfo">
              <label htmlFor="Address">Address : </label>
              <span>{billto?.address}</span>
            </div>}

            {gstBill && <div className="maininfo">
            <label htmlFor="GST">GST : </label>
            <span>{invoiceDates.gst}</span>
          </div>}

          </div>
        </div>

        <div className="invoiceDates">
          <p>INVOICE</p>

          <div className="datesinfo">

          {invoiceDates?.invoiceNumber && <div className="date" style={{flexGrow: 1}}>
              <label htmlFor="issue" style={{color: '#e31616'}}>Invoice No : </label>
              <span>{' ' + invoiceDates.invoiceNumber}</span>
            </div>}

            {invoiceDates?.issueDate && <div className="date">
              <label htmlFor="issue">Issue Date : </label>
              <span>{invoiceDates.issueDate}</span>
            </div>}

           {invoiceDates?.dueDate && <div className="date">
              <label htmlFor="dueissue">Due Date : </label>
              <span>{invoiceDates.dueDate}</span>
            </div>}

            {showGst && <div className="date">
            <label htmlFor="dueissue">GST : </label>
            <span>23BFNPG0660P1Z8</span>
          </div>}

            
           
          </div>
        </div>

        
      </div>

      <div className="invoicepreviewbottom">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th className='tableHeaderStyle'>S No.</th>
              <th className='tableHeaderStyle'>Item</th>
              <th className='tableHeaderStyle'>Price</th>
              <th className='tableHeaderStyle'>Quantity</th>
              <th className='tableHeaderStyle'>Amount</th>

            </tr>
          </thead>
          <tbody>
            {items && items.map((item, index) => (
              <tr key={index}>
                <td className='tableDataStyle'>{index + 1}</td>
                <td className='tableDataStyle' style={{ width: '48%', textAlign: 'start' }}>{item.name}</td>
                <td className='tableDataStyle'>{item.price}</td>
                <td className='tableDataStyle'>{item.quantity}</td>
                <td className='tableDataStyle'>{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

      

       

      </div>

      <div className="footerinvoice">


      <div className="footerright">
       {amountdetails?.subtotal !==0 &&  <div className="box">
          <div className="totalname">
            Sub-total
          </div>
          <div className="totalprice">
            {amountdetails?.subtotal}
          </div>
        </div>}

       {amountdetails?.discount !== 0 &&  <div className="box">
          <div className="totalname">
            Discount ({amountdetails?.discountName})
          </div>
          <div className="totalprice">
            {amountdetails?.discount}
          </div>
        </div>}

        {
          taxes && taxes.map((tax) => {
            return <div className="box" >
              <div className="totalname">
                {tax.name}
              </div>
              <div className="totalprice">
                {tax.value}%
              </div>
            </div>
          })
        }

        <div className="box" style={{ backgroundColor: '#e31616' }}>
          <div className="totalname" style={{ color: '#fff', border: 'none', fontWeight: 'bold' }}>
            TOTAL
          </div>
          <div className="totalprice" style={{ color: '#fff', border: 'none' }}>
          {Math.ceil(amountdetails?.subtotal - amountdetails?.discount + amountdetails?.tax)}
          </div>
        </div>

        
      </div>
      <div className="toWord" style={{width: '350px'}}>
      <span style={{fontSize: '15px' , fontWeight: 500 , color: '#e31616'}}>Amount in Words :</span>  
      {amountdetails && <span style={{fontSize: '15px'}}>{' '+ numberToWords.toWords(Math.ceil(amountdetails.subtotal - amountdetails.discount + amountdetails.tax))}</span>}
      <div className="bankdetails" style={{marginTop: '38px' , fontSize: '17px'}}>
      <span style={{fontWeight: 'bold'}}>Please share payment to</span><br />
      <p>BANK NAME:- Bank of Baroda</p>
      <p>NAME:- SB ONLINE SERVICES</p>
      <p>ACC NO.40490200001457</p>
      <p>IFSC CODE:- BARB0GADARW</p>
      <p>Place - Gadarwara</p>
      </div>
      
      </div>

      
    </div>
    


      <div className="mainFooter">
            <div className="mainfootertop">
            </div>
            <div className="mainfooterbottom">
            <span style={{paddingLeft: '30px',
              fontSize: '16px',textTransform: 'uppercase'}}>SUBJECT TO GADARWARA JURISDICTION </span>
              <div className="blackbox">
              
              </div>

              <div className="redbox">
              
              </div>
            </div>
      </div>

    </div>
  )
}
