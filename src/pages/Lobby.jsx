import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import "../assets/style/pages/lobby.scss";
import { loadCodeBlocks } from "../store/actions/codeBlockActions";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

function Lobby() {
  const dispatch = useDispatch();
  const codeBlocks = useSelector(
    (storeState) => storeState.codeBlockModule.codeBlocks
  );

  useEffect(() => {
    dispatch(loadCodeBlocks());
  }, [dispatch]);

  // Check if codeBlocks is undefined or an empty array before mapping
  if (!codeBlocks || codeBlocks.length === 0) {
    return (
      <div>
        <CircularProgress />
      </div>
    ); 
  }

  return (
    <div className="lobby-container">
      <Grid container spacing={2} justifyContent="center">
        {codeBlocks.map((block, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
            <Link to={`/code/${block._id}`} className="code-block-item">
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
