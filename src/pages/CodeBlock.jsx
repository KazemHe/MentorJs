import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AceEditor from "react-ace";
import { saveCodeBlock } from "../store/actions/codeBlockActions";
import { useDispatch } from "react-redux";
import { codeBlockesService } from "../services/code.block.service";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/ext-language_tools";
import { styled } from "@mui/system";
import { Button, Switch, Grid, Typography } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useSocket } from "../services/socketService";
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
  const [isMentor, setIsMentor] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);
  const socket = useSocket(id, setCodeBlock, setIsMentor, setEditedCode);

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
    socket.emit("code editing", { ...codeBlock, code: newCode });
  }

  const handleSave = () => {
    const removeWhiteSpaces = (str) => str.replace(/\s/g, ""); // removing the white spaces
    const editedCodeWithoutSpaces = removeWhiteSpaces(editedCode);
    const solutionWithoutSpaces = removeWhiteSpaces(codeBlock.solution);

    const isCorrect = editedCodeWithoutSpaces === solutionWithoutSpaces;

    dispatch(saveCodeBlock({ ...codeBlock, starter: editedCode }));

    if (isCorrect) {
      console.log("Code is correct!");
      // Show a message or perform an action for a correct answer
    } else {
      // Show a message or perform an action for an incorrect answer
      console.log("Code is incorrect!");
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
