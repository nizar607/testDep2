
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

type Contact = {
    _id: string;
    name: string;
    email: string;
    subject: string;
    phone: string;
    message: string;
};

const TablesWidgetContact: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [sortModel, setSortModel] = useState({ field: '', sort: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [contactsPerPage] = useState(5);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/contact/contacts');
                setContacts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        fetchContacts();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = (id: string) => async () => {
        const filteredContacts = contacts.filter
            (contact => contact._id !== id);
        setContacts(filteredContacts);
        await axios.delete(`http://localhost:3001/contact/contacts/${id}`);
    }


    const handleSort = (field: keyof Contact) => {
        const isAsc = sortModel.field === field && sortModel.sort === 'asc';
        setSortModel({ field, sort: isAsc ? 'desc' : 'asc' });
    };
    // Get current contacts
    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    // Filter contacts by search term
    const filteredContacts = currentContacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className='me-10'>
            <div className='card-body py-3'>
                <input type="text" placeholder="Search by first name" onChange={handleSearch} />

                <div className='table-responsive'>
                    <table className='table align-middle gs-0 gy-4'>
                        <thead>

                            <tr className='fw-bold text-muted bg-light'>
                                <th className='min-w-125px' onClick={() => handleSort('name')}>
                                    name {sortModel.field === 'name' ? (sortModel.sort === 'asc' ? '↑' : '↓') : ''}
                                </th>
                                <th className='min-w-125px' onClick={() => handleSort('email')}>
                                    email {sortModel.field === 'email' ? (sortModel.sort === 'asc' ? '↑' : '↓') : ''}
                                </th>
                                <th className='min-w-125px' onClick={() => handleSort('phone')}>
                                    Phone {sortModel.field === 'phone' ? (sortModel.sort === 'asc' ? '↑' : '↓') : ''}
                                </th>
                                <th className='min-w-125px' onClick={() => handleSort('subject')}>
                                    Subject {sortModel.field === 'subject' ? (sortModel.sort === 'asc' ? '↑' : '↓') : ''}
                                </th>
                                <th className='min-w-125px' onClick={() => handleSort('message')}>
                                    Message {sortModel.field === 'message' ? (sortModel.sort === 'asc' ? '↑' : '↓') : ''}
                                </th>
                                <th className='min-w-10px text-end rounded-end'>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredContacts.map(contact => (
                                <tr key={contact._id}>

                                    <td>
                                        <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                            {contact.name}
                                        </span>
                                    </td>
                                    <td>
                                        <strong>{contact.email}</strong>
                                    </td>
                                    <td>
                                        <span className='badge badge-light-primary fs-7 fw-semibold'>
                                            {contact.phone}
                                        </span>
                                    </td>
                                    <td>
                                        <span className='badge badge-light-primary fs-7 fw-semibold'>
                                            {contact.subject}
                                        </span>
                                    </td><td>
                                        <span className='badge badge-light-primary fs-7 fw-semibold'>
                                            {contact.message}
                                        </span>
                                    </td>
                                    <td className='text-end'>
                                        <Button variant="danger" size="sm" onClick={handleDelete(contact._id)}>delete</Button>
                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                    <div>
                        <div className="pagination" style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                style={{ margin: '0 5px', padding: '5px 10px', border: 'none', backgroundColor: '#f0f0f0', cursor: 'pointer' }}
                            >
                                Previous
                            </button>
                            {[...Array(Math.ceil(contacts.length / contactsPerPage))].map((e, i) => (
                                <button
                                    key={`page_${i + 1}`}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={currentPage === i + 1 ? 'active' : ''}
                                    style={{ margin: '0 5px', padding: '5px 10px', border: 'none', backgroundColor: currentPage === i + 1 ? '#007bff' : '#f0f0f0', color: currentPage === i + 1 ? 'white' : 'black', cursor: 'pointer' }}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === Math.ceil(contacts.length / contactsPerPage)}
                                style={{ margin: '0 5px', padding: '5px 10px', border: 'none', backgroundColor: '#f0f0f0', cursor: 'pointer' }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export { TablesWidgetContact };