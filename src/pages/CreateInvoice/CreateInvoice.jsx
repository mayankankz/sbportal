import React, { useEffect, useRef, useState } from 'react';
import './Invoice.scss';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    Switch,
    TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Add, DownloadOutlined, Print, SaveOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print';
import { PreviewInvoice } from '../../components/PreviewInvoice/PreviewInvoice';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import axios from 'axios';
import ColorRadioButtons from '../../components/RadioButton/RadioButton';
import { BASEPATH } from '../../config';

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateInvoiceNumber() {
    const randomPart = generateRandomNumber(1000, 9999);
    const timestamp = Date.now().toString().slice(-5);
    return `SB-${new Date().getFullYear()}-${randomPart}-${timestamp}`;
}

export const CreateInvoice = () => {
    const [items, setItems] = useState([]);
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [subtotal, setSubtotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [tax, setTax] = useState(0);
    const [showDiscountModal, setShowDiscountModal] = useState(false);
    const [showTaxModal, setShowTaxModal] = useState(false);
    const [discountName, setDiscountName] = useState('');
    const [taxName, setTaxName] = useState('');
    const [taxes, setTaxes] = useState([]);
    const [name, setName] = useState('');
    const [companyname, setcompanyname] = useState('');
    const [address, setAddress] = useState('');
    const [gst, setGst] = useState('');
    const [mobile, setMobile] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [Preview, setPreview] = useState(false);
    const [gstBill, setGstbill] = React.useState(false);
    const [showGst, setshowGst] = React.useState(true);
    const [payment, setpayment] = React.useState('Unpaid');
    const [email, setemail] = React.useState('');

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleGenerateInvoice = () => {
        const newInvoiceNumber = generateInvoiceNumber();
        setInvoiceNumber(newInvoiceNumber);
    };

    useEffect(() => {
        handleGenerateInvoice();
    }, []);

    useEffect(() => {
        const newSubtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
        setSubtotal(newSubtotal);
    }, [items]);

    useEffect(() => {
        // Update the total amount whenever subtotal, discount, or tax change
        const totalAmount = subtotal - discount + tax;
        // Update total amount and perform any other calculations here
    }, [subtotal, discount, tax]);

    const handleAddItem = () => {
        const newItem = {
            name: '',
            price: 0,
            quantity: 1,
        };
        setItems([...items, newItem]);
    };

    const handleRemoveItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

    const handleDiscountModalOpen = () => {
        setShowDiscountModal(true);
    };

    const handleDiscountModalClose = () => {
        setShowDiscountModal(false);
    };

    const handleTaxModalOpen = () => {
        setShowTaxModal(true);
    };

    const handleTaxModalClose = () => {
        setShowTaxModal(false);
    };

    const handleApplyDiscount = () => {
        const discountAmount = (subtotal * discount) / 100;
        setDiscount(discountAmount);
        setDiscountName(discountName);
        handleDiscountModalClose();
    };

    const handleApplyTax = () => {
        const totalTaxesAmount = taxes.reduce((total, tax) => total + (subtotal * tax.value) / 100, 0);
        setTax(totalTaxesAmount);
        setTaxName(taxName);
        handleTaxModalClose();
    };

    const handleRemoveDiscount = () => {
        setDiscount(0);
        setDiscountName('');
    };

    const handleAddTax = () => {
        const newTax = {
            name: '',
            value: 0,
        };
        setTaxes([...taxes, newTax]);
        handleTaxModalOpen();
    };

    const handleRemoveTax = (index) => {
        const updatedTaxes = [...taxes];
        updatedTaxes.splice(index, 1);

        setTaxes(updatedTaxes);
        // Recalculate total after removing tax
        const totalTaxesAmount = updatedTaxes.reduce((total, tax) => total + (subtotal * tax.value) / 100, 0);
        setTax(totalTaxesAmount);
    };

    const handleTaxChange = (index, field, value) => {
        const updatedTaxes = [...taxes];
        updatedTaxes[index][field] = value;
        setTaxes(updatedTaxes);
    };


    const handleInvoiceSave = async () => {
        const fields = [
            { value: invoiceNumber, name: 'Invoice Number' },
            { value: issueDate, name: 'Issue Date' },
            { value: dueDate, name: 'Due Date' },
            { value: name, name: 'Name' },
            { value: address, name: 'Address' },
            { value: mobile, name: 'Mobile' },
            { value: subtotal, name: 'Subtotal' },
        ];
        const missingFields = fields.filter(field => !field.value);

        if (missingFields.length > 0) {
            const missingFieldNames = missingFields.map(field => field.name);
            missingFieldNames.forEach((err) => {
                const errorMessage = `${err} is mandatory.`;
                toast.error(errorMessage, {
                    position: toast.POSITION.TOP_CENTER,
                });
            })
            return;
        }

        try {
            const response = await axios.post(`${BASEPATH}app/saveinvoice`, {
              items,
              taxes,
              name,
              address,
              gst,
              mobile,
              issueDate,
              dueDate,
              invoiceNumber,
              discount: {name : discountName , amount : discount},
              gstBill,
              email,
              status: payment,
              total : subtotal - discount + tax,
              companyname,
            });
        
            if (response.status === 201) {
              const data = response.data;
              toast.success('Invoice saved successfully.', {
                position: toast.POSITION.TOP_CENTER,
              });
            } else {
              toast.error('An error occurred while saving the invoice.', {
                position: toast.POSITION.TOP_CENTER,
              });
            }
          } catch (error) {
            console.error(error);
            toast.error('An error occurred while saving the invoice.', {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        };


    return (
        <>
            <div className="invoiceWrapper">
                {Preview ? (
                    <PreviewInvoice printref={componentRef} items={items} taxes={taxes} billto={{ name, address, gst, mobile, companyname }} invoiceDates={{ issueDate, dueDate, invoiceNumber, gst }} amountdetails={{ subtotal, discount, discountName, tax }} gstBill={gstBill} showGst={showGst} />
                ) : (
                    <div className="invoicesection">
                        {/* Invoice Details Section */}
                        <div className="invoicetop">
                            {/* Info Container */}
                            <div className="infoContainer">
                                <div className="logo">
                                    <img src="/img/1.png" alt="" />
                                </div>
                                <div className="name">
                                    <span style={{ fontWeight: 'bold', color: '#e31616' }}>
                                        SB ONLINE
                                    </span>
                                    <span> Services</span>
                                    <p>Test@gmail.com</p>
                                    {showGst && <p>Gst In: 23BFNPG0660P1Z8</p>}
                                </div>
                            </div>
                            {/* Address */}
                            <div className="address">
                                <span>Near TVS Showroom</span>
                                <span>Hospital Road</span>
                                <span>Gadarwara, 487551</span>
                            </div>
                        </div>
                        {/* Invoice Center */}
                        <div className="invoicecenter">
                            <div className="invoicedetails">
                                <h4>Invoice Number</h4>
                                <div className="issuedate">
                                    <div>{invoiceNumber}</div>
                                    {issueDate && (
                                        <label>
                                            Issue Date : <p>{issueDate}</p>
                                        </label>
                                    )}
                                    {dueDate && (
                                        <label>
                                            Due Date : <p>{dueDate}</p>
                                        </label>
                                    )}
                                </div>
                            </div>
                            <div className="billedto">
                                <h4>Billed to</h4>
                                <div className="billedtoinfo">
                                    <p>{name}</p>
                                    <p>{address}</p>
                                    <p>{mobile}</p>
                                    {gst && <p>GST : {gst}</p>}
                                </div>
                            </div>
                        </div>
                        {/* Invoice Bottom */}
                        <div className="invoicebottom">
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={tableHeaderStyle}>Item</th>
                                        <th style={tableHeaderStyle}>Price</th>
                                        <th style={tableHeaderStyle}>Quantity</th>
                                        <th style={tableHeaderStyle}>Amount</th>
                                        <th style={tableHeaderStyle}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <TextField
                                                    size="small"
                                                    id="standard-basic"
                                                    label="Item"
                                                    variant="standard"
                                                    style={inputStyle}
                                                    value={item.name}
                                                    onChange={(e) =>
                                                        handleItemChange(index, 'name', e.target.value)
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <TextField
                                                    size="small"
                                                    id="standard-basic"
                                                    label="Price"
                                                    variant="standard"
                                                    style={inputStyle}
                                                    type="number"
                                                    value={item.price}
                                                    onChange={(e) =>
                                                        handleItemChange(index, 'price', parseFloat(e.target.value))
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <TextField
                                                    size="small"
                                                    id="standard-basic"
                                                    label="Quantity"
                                                    variant="standard"
                                                    style={inputStyle}
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        handleItemChange(index, 'quantity', parseInt(e.target.value))
                                                    }
                                                />
                                            </td>
                                            <td style={tableDataStyle}>{item.price * item.quantity}</td>
                                            <td style={tableDataStyle}>
                                                <IconButton
                                                    aria-label="delete"
                                                    color="error"
                                                    onClick={() => handleRemoveItem(index)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="invoicefooter">
                                <div className="left">
                                    <button style={addButtonStyle} onClick={handleAddItem}>
                                        Add Item
                                    </button>
                                </div>
                                <div className="right">
                                    <div className="detailbox">
                                        <span>Subtotal: </span>
                                        <span>{subtotal}</span>
                                    </div>
                                    <div className="detailbox">
                                        <span>Discount: </span>
                                        {discount ? (
                                            <p>
                                                {discountName} : {discount}{' '}
                                                <IconButton
                                                    aria-label="delete"
                                                    color="error"
                                                    onClick={handleRemoveDiscount}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </p>
                                        ) : (
                                            <Button startIcon={<Add />} onClick={handleDiscountModalOpen}>
                                                Add
                                            </Button>
                                        )}
                                    </div>
                                    <div className="detailbox">
                                        <span>Taxes:</span>
                                        {taxes.map((tax, index) => (
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <p key={index}>
                                                    {tax.name}: {tax.value}%
                                                    <IconButton
                                                        aria-label="delete"
                                                        color="error"
                                                        onClick={() => handleRemoveTax(index)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </p>
                                            </div>
                                        ))}
                                        <Button startIcon={<Add />} onClick={handleAddTax}>
                                            Add Tax
                                        </Button>
                                    </div>
                                    <div className="totalAmount" style={{ marginTop: 20 }}>
                                        <span>Total: {subtotal - discount + tax}</span>
                                    </div>
                                </div>
                            </div>
                            {/* Discount Modal */}
                            <Dialog open={showDiscountModal} onClose={handleDiscountModalClose}>
                                <DialogTitle>Discount</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        label="Discount Name"
                                        variant="outlined"
                                        value={discountName}
                                        onChange={(e) => setDiscountName(e.target.value)}
                                    />
                                    <TextField
                                        label="Discount Value (%)"
                                        variant="outlined"
                                        type="number"
                                        value={discount}
                                        onChange={(e) => setDiscount(parseFloat(e.target.value))}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleDiscountModalClose}>Cancel</Button>
                                    <Button onClick={handleApplyDiscount}>Apply</Button>
                                </DialogActions>
                            </Dialog>
                            {/* Tax Modal */}
                            <Dialog open={showTaxModal} onClose={handleTaxModalClose} >
                                <DialogTitle>Tax</DialogTitle>
                                <DialogContent>
                                    {taxes.map((tax, index) => (
                                        <div key={index} >
                                            <TextField
                                                size="small"
                                                label={`Tax Name ${index + 1}`}
                                                variant="outlined"
                                                value={tax.name}
                                                onChange={(e) => handleTaxChange(index, 'name', e.target.value)}
                                            />
                                            <TextField
                                                size="small"
                                                label={`Tax Value (%) ${index + 1}`}
                                                variant="outlined"
                                                type="number"
                                                value={tax.value}
                                                onChange={(e) => handleTaxChange(index, 'value', parseFloat(e.target.value))}
                                            />
                                            <IconButton
                                                aria-label="delete"
                                                color="error"
                                                onClick={() => handleRemoveTax(index)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    ))}
                                    <Button startIcon={<Add />} onClick={handleAddTax}>
                                        Add Tax
                                    </Button>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleTaxModalClose}>Cancel</Button>
                                    <Button onClick={handleApplyTax}>Apply</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                )}
                {/* Action Section */}
                <div className="actionsection">
                    <div className="actionbutton">
                        <Button variant="outlined" startIcon={Preview ? <EditIcon /> : <VisibilityOutlined />} onClick={() => setPreview(!Preview)}>
                            {Preview ? 'Edit' : 'Preview'}
                        </Button>
                       {Preview &&  <Button variant="outlined" startIcon={<Print />} onClick={handlePrint}>
                            Print
                        </Button>}
                        <Button variant="outlined" startIcon={<SaveOutlined />} onClick={handleInvoiceSave}>
                            Save
                        </Button>
                    </div>
                    <div className="basicinfo">
                        <h4>Basic Info</h4>
                        <div className="billinfo">
                            <div className="firstSide">
                                <div className="inputBox">
                                    <label htmlFor="Name"> Name </label>
                                    <input type="text" name="name" id="" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="inputBox">
                                    <label htmlFor="Address"> Address </label>
                                    <input type="text" name="Address" id="" value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div className="inputBox">
                                    <label htmlFor="Mobile"> Mobile </label>
                                    <input type="text" name="Mobile" id="" value={mobile} placeholder="Mobile" onChange={(e) => setMobile(e.target.value)} />
                                </div>
                                <div className="inputBox">
                                    <label htmlFor="GST"> GST (optional) </label>
                                    <input type="text" name="gst" id="" value={gst} placeholder="GST" onChange={(e) => setGst(e.target.value)} />
                                </div>
                                <div className="inputBox">
                                    <label htmlFor="companyname"> Company Name (optional) </label>
                                    <input type="text" name="companyname" id="" value={companyname} placeholder="Company Name" onChange={(e) => setcompanyname(e.target.value)} />
                                </div>

                            </div>

                            <div className="secondSide">
                                <div className="inputBox">
                                    <label htmlFor="Issue Date"> Issue Date </label>
                                    <input type="date" name="" id="" onChange={(e) => setIssueDate(e.target.value)} />
                                </div>
                                <div className="inputBox">
                                    <label htmlFor="Due Date"> Due Date </label>
                                    <input type="date" name="" id="" onChange={(e) => setDueDate(e.target.value)} />
                                </div>
                                <div className="inputBox">
                                    <label htmlFor="Due Date"> GST Bill </label>
                                    <Switch
                                        checked={gstBill}
                                        onChange={(e) => setGstbill(!gstBill)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </div>

                                <div className="inputBox">
                                    <label htmlFor="Due Date"> Show Gst </label>
                                    <Switch
                                        checked={showGst}
                                        onChange={(e) => setshowGst(!showGst)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </div>

                                <div className="inputBox">
                                <label htmlFor="Due Date"> Payment Status</label>
                                <ColorRadioButtons selectedValue={payment} setSelectedValue={setpayment} />
                            </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


const tableHeaderStyle = {
    padding: '6px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    background: '#f9f9f9',
};

const inputStyle = {
    width: '100%',
    padding: '2px',
    border: 'none',
    borderRadius: '4px',
};

const tableDataStyle = {
    padding: '8px',
    border: 'none',
    textAlign: 'center',
};

const addButtonStyle = {
    marginTop: '10px',
    padding: '8px 16px',
    background: '#D8312C',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};
