import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AceEditor from "react-ace";
import { saveCodeBlock } from "../store/actions/codeBlockActions";
import { useDispatch } from "react-redux";
import { codeBlockesService } from "../services/code.block.service";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/mode-javascript";
import 'ace-builds/src-noconflict/ext-language_tools';

import { styled } from "@mui/system";
import { Button, Switch, Grid, Typography } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

const PreContainer = styled("div")({
  height: "93",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

function CodeBlock({ codeBlocks }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [codeBlock, setCodeBlock] = useState({});
  const dispatch = useDispatch();
  const { instruction, starter } = codeBlock;
  const [editedCode, setEditedCode] = useState(starter);
  const [isMentor, setIsMentor] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    setEditedCode(starter);
  }, [starter]);

  useEffect(() => {
    loadCodeBlock();
  }, [id]);

  async function loadCodeBlock() {
    try {
      const codeBlock = await codeBlockesService.getById(id);
      setCodeBlock(codeBlock);
    } catch (error) {
      console.error("error:", error);
    }
  }

  function handleChange(newCode) {
    setEditedCode((prev) => (prev, newCode)); // Update the state with the new code
  }

  // function handleChange(newCode) {
  //   setEditedCode(newCode); // Update the state with the new code as a string
  // }

  const handleSave = () => {
    const isCorrect = editedCode === codeBlock.solution;

    dispatch(saveCodeBlock({ ...codeBlock, starter: editedCode }));

    if (isCorrect) {
      console.log("Code is correct!");
      // Show a message or perform an action for a correct answer
    } else {
      console.log("Code is incorrect!");
      // Show a message or perform an action for an incorrect answer
    }
  };

  function goBack() {
    navigate(-1);
  }

  const toggleLightMode = () => {
    setIsLightMode(!isLightMode);
  };

  return (
    <PreContainer>
      <Grid container alignItems="center" justifyContent="center" spacing={1}>
        <Grid item>
          <DarkModeOutlinedIcon
            style={{ color: isLightMode ? "#555" : "#fff" }}
          />
        </Grid>
        <Grid item>
          <Switch
            checked={isLightMode}
            onChange={toggleLightMode}
            color="primary"
          />
        </Grid>
        <Grid item>
          <LightModeOutlinedIcon
            style={{ color: isLightMode ? "#fff" : "#555" }}
          />
        </Grid>
      </Grid>
      <Typography
        style={{
          color: isLightMode ? "#fff" : "rgb(182 172 172)",
          marginBottom: "10px",
        }}
      >
        {instruction}
      </Typography>
      <AceEditor
        mode="javascript"
        theme={isLightMode ? "solarized_light" : "monokai"}
        fontSize={14}
        showPrintMargin={false}
        highlightActiveLine={true}
        value={editedCode}
        onChange={handleChange}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          readOnly: isMentor,
        }}
        style={{
          width: "80%",
          maxWidth: "800px",
          border: "1px solid #555",
          borderRadius: "4px",
          padding: "1rem",
        }}
      />

      <div className="code-block-buttons">
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
