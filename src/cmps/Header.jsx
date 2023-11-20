import React from 'react';
import '../assets/style/cmps/header.scss';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className='header'>
      <Link to="/" className='title'>
        Mentor Js
      </Link>
      <div className='github-icon'>
        <Link to={`github.com`} className='github-link'>
          <GitHubIcon />
        </Link>
      </div>
    </div>
  );
}
