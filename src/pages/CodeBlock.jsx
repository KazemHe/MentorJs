import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/mode-javascript';
import { styled } from '@mui/system';
import { Button, Switch, Grid, Typography } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

const PreContainer = styled('div')({
  height: '93',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

function CodeBlock({ codeBlocks }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const codeBlock = codeBlocks.find(block => block.id === id);

  const { instruction, starter } = codeBlock;
  const [editedCode, setEditedCode] = useState(starter);
  const [isMentor, setIsMentor] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    setEditedCode(starter);
  }, [starter]);

  const handleSave = () => {
    console.log('Code saved:', editedCode);
  };

  function goBack() {
    navigate(-1);
  }

  const toggleLightMode = () => {
    setIsLightMode(!isLightMode);
  };

  return (
    <PreContainer >
       <Grid container alignItems="center" justifyContent="center" spacing={1}>
        <Grid item>
          <DarkModeOutlinedIcon style={{ color: isLightMode ? '#555' : '#fff' }} />
        </Grid>
        <Grid item>
          <Switch checked={isLightMode} onChange={toggleLightMode} color="primary" />
        </Grid>
        <Grid item>
          <LightModeOutlinedIcon style={{ color: isLightMode ? '#fff' : '#555' }} />
        </Grid>
      </Grid>
      <Typography style={{ color: isLightMode ? '#fff' : 'rgb(182 172 172)', marginBottom: '10px' }}>{instruction}</Typography>
      <AceEditor
        mode="javascript"
        theme={isLightMode ? 'solarized_light' : 'monokai'}
        fontSize={14}
        showPrintMargin={false}
        highlightActiveLine={true}
        value={editedCode}
        onChange={(newCode) => setEditedCode(newCode)}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          readOnly: isMentor
        }}
        style={{
          width: '80%',
          maxWidth: '800px',
          border: '1px solid #555',
          borderRadius: '4px',
          padding: '1rem',
        }}
      />
     
      <div className='code-block-buttons'>
        <Button variant="text" onClick={handleSave}>
          Check Your Answer
        </Button>
        <Button variant="text" onClick={goBack}>
          Back
        </Button>
      </div>
    </PreContainer>
  );
}

export default CodeBlock;
