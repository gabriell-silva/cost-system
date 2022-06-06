import React from "react";
import { Route, Routes } from "react-router-dom";
import Container from '../layouts/Container';
import Company from './/Company';
import Contact from './Contact';
import Home from './Home';
import NewProject from './NewProject';
import Projects from './Projects';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import Project from './Project';

const Pages = () => {
  return (
    <>
    <Navbar />
        <Container customClass="min_height">
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='projects' element={<Projects />} />
            <Route path='company' element={<Company />} />
            <Route path='contact' element={<Contact />} />
            <Route path='newproject' element={<NewProject />} />
            <Route path='project/:id' element={<Project />} />
        </Routes>
        </Container>
    <Footer />
    </>
  );
};

export default Pages;