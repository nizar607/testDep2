import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(2),
      backgroundColor: '#E2DFD0', 
    },
    form: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
    },
    button: {
      marginTop: theme.spacing(2),
    },
  }));
  
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#ee1e46', // Set primary color to #ee1e46
      },
    },
  });
  
  const ContactForm = () => {
    const classes = useStyles();
    const [contact, setContact] = useState({ name: '', email: '', subject: '', phone: '', message: '' });
    const [errors, setErrors] = useState({});
  
    const handleChange = (e) => {
      setContact({ ...contact, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: '' });
    };
  
    const validate = () => {
      let tempErrors = {};
      tempErrors.name = contact.name ? "" : "This field is required.";
      tempErrors.email = (/^$|.+@.+..+/).test(contact.email) ? "" : "Email is not valid.";
      tempErrors.subject = contact.subject ? "" : "This field is required.";
      tempErrors.phone = contact.phone.length > 9 ? "" : "Minimum 10 numbers required.";
      tempErrors.message = contact.message ? "" : "This field is required.";
      setErrors({ ...tempErrors });
      return Object.values(tempErrors).every(x => x === "");
    };
   
    const handleSubmit = async(event) => {
        event.preventDefault(); 
      if (validate()) {
        try {
          await axios.post('http://localhost:3001/contact/addcontacts', contact);
          setContact({ name: '', email: '', subject: '', phone: '', message: '' });
          alert('Contact added successfully');
        } catch (error) {
          alert('Error creating contact');
        }
      }
    };
  return (
    <ThemeProvider theme={theme}>
    <Grid container justify="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: '#000' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper className={classes.paper}>
          <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={contact.name}
            onChange={handleChange}
            {...(errors.name && { error: true, helperText: errors.name })}
          />
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={contact.email}
              onChange={handleChange}
            />
            <TextField
              name="subject"
              label="Subject"
              variant="outlined"
              fullWidth
              margin="normal"
              value={contact.subject}
              onChange={handleChange}
            />
            <TextField
              name="phone"
              label="Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              value={contact.phone}
              onChange={handleChange}
            />
            <TextField
              name="message"
              label="Message"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={contact.message}
              onChange={handleChange}
            />
              <Button className={classes.button} type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ContactForm;