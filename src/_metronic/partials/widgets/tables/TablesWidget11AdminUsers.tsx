import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

type User = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: string;
};

type Props = {
  Users: User[];
};

const TablesWidget11AdminUsers: React.FC<Props> = ({ Users }) => {
  const [newUsers, setNewUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setNewUsers([...Users]);
  }, [Users]);

  const banUser = async (userId: string) => {
    try {
      await axios.put(`http://localhost:3001/user/ban/${userId}`);
      setNewUsers(newUsers.map(user => user._id === userId ? { ...user, status: 'banned' } : user));
      alert('User banned successfully');
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };

  const unbanUser = async (userId: string) => {
    try {
      await axios.put(`http://localhost:3001/user/activate/${userId}`);
      setNewUsers(newUsers.map(user => user._id === userId ? { ...user, status: 'active' } : user));
      alert('User unbanned successfully');
    } catch (error) {
      console.error('Error unbanning user:', error);
    }
  };

  const filteredUsers = newUsers.filter(user =>
    (user.first_name?.toLowerCase().includes(searchText.toLowerCase()) ||
    user.last_name?.toLowerCase().includes(searchText.toLowerCase()))
  );
  

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className='me-10'>
      <div className='card-body py-3'>
        <TextField
          id="search-user"
          label="Search User"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className='table-responsive'>
          <table className='table align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bold text-muted bg-light'>
                <th className='ps-4 min-w-325px rounded-start'>User</th>
                <th className='min-w-125px'>Email</th>
                <th className='min-w-125px'>Role</th>
                <th className='min-w-125px'>Status</th>
                <th className='min-w-200px text-end rounded-end'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index}>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-50px me-5'>
                        {/* Placeholder for user image */}
                        <span className='symbol-label bg-light-warning'>
                          {user.first_name.charAt(0)}
                        </span>
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                          {user.first_name} {user.last_name}
                        </a>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td><strong>{user.email}</strong></td>
                  <td>
                    <span className='badge badge-light-primary fs-7 fw-semibold'>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${user.status === 'active' ? 'badge-light-success' : 'badge-light-danger'} fs-7 fw-semibold`}>
                      {user.status}
                    </span>
                  </td>
                  <td className='text-end'>
                    {user.status === 'active' ? (
                      <button onClick={() => banUser(user._id)} className='btn btn-warning btn-sm me-2'>Ban</button>
                    ) : (
                      <button onClick={() => unbanUser(user._id)} className='btn btn-success btn-sm'>Unban</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Pagination
              count={Math.ceil(filteredUsers.length / usersPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export { TablesWidget11AdminUsers };
