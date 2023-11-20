import React from 'react';
import { Link } from 'react-router-dom'; 
import { Grid } from '@mui/material';
import '../assets/style/pages/lobby.scss';

function Lobby({ codeBlocks }) {
  return (
    <div className="lobby-container">
      <Grid container spacing={2} justifyContent="center">
        {codeBlocks.map((block, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
            <Link to={`/code/${block.id}`} className="code-block-item">
              <div className="block-item">
                <h3>{block.title}</h3>
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Lobby;
