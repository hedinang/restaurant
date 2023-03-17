import React from 'react';
import { Layout } from 'antd';
import { Navigate, Route, Routes } from 'react-router-dom';
import './scss/index.scss'
import Navbar from './component/nav/NavBar';
import About from './page/About';
import Project from './page/project/Project';
import ProjectDetail from './page/project/ProjectDetail';
import Home from './page/home/Home';
import { Footer } from './component/footer/Footer';
import UpButton from './component/upButton/UpButton';


function App() {
  const pageList = [
    {
      path: '/*',
      component: <Navigate to="/home" replace />
    },
    {
      path: '/home',
      component: <Home />

    },
    {
      path: '/project',
      component: <Project />

    },
    {
      path: '/about',
      component: <About />

    },
    {
      path: '/project-detail',
      component: <ProjectDetail />

    }
  ]

  return (
    <Layout>
      <Navbar />
      <Layout>
        <Routes>
          {pageList.map(e => {
            return <Route path={e.path} element={
              e.component
            } />
          })}
        </Routes>
      </Layout>
      <Footer />
      <UpButton />
    </Layout>
  )
}

export default App;
