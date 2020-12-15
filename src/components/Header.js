import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';


const Header = ({handleSearchChange, handleSubmit}) => {

  return (
    <Navbar bg="dark" variant="dark" style={{display: 'flex', justifyContent: 'space-between'}}>
      <Navbar.Brand href='/'>Episode Switcher</Navbar.Brand>
      <Form onSubmit={handleSubmit} inline>
        <FormControl type="text" placeholder="Enter a TV Show" className="mr-sm-2" onChange={handleSearchChange}/>
        <Button type='submit' variant="outline-info">Search</Button>
      </Form>
    </Navbar>
  )
}

export default Header;