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
import { Button, Grid ,Typography } from "@mui/material";
import MaterialUISwitch from '../cmps/swich';
import { useSocket } from "../services/socketService";
import CustomModal from "../cmps/answerCheck";
import '../assets/style/pages/CodeBlock.scss'

const PreContainer = styled("div")({
  height: "96vh",
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false); // New state for correctness

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
      // Show a message or perform an action for a correct answer
      console.log("Code is correct!");
      setIsCorrectAnswer(true); // Set state for correct answer
      openModal();
    } else {
      // Show a message or perform an action for an incorrect answer
      console.log("Code is incorrect!");
      setIsCorrectAnswer(false); // Set state for incorrect answer
      openModal();
    }
  };

  function goBack() {
    navigate(-1);
  }

  const toggleLightMode = () => {
    setIsLightMode(!isLightMode);
  };

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }
  return (
    <PreContainer>
      <h4 style={{color : "#fff"}}>Welcome {isMentor ? 'Mentor' : 'Student'}</h4>
      <Grid container alignItems="center" justifyContent="center" spacing={1}>
        <Grid item>
          <MaterialUISwitch
            checked={isLightMode}
            onChange={toggleLightMode}
          />
        </Grid>
      </Grid>
      <Typography
        style={{
          color: isLightMode ? "#fff" : "rgb(182 172 172)",
          marginBottom: "10px",
          padding : "5px",
        }}
      >
        {instruction}
      </Typography>
      <CustomModal open={isModalOpen} handleClose={closeModal} isCorrect={isCorrectAnswer}/>
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
          maxWidth: "600px",
          border: "1px solid #555",
          borderRadius: "4px",
          padding: "1rem",
          maxHeight :"410px"
        }}
      />
      <div className="code-block-buttons" style={{ display: "flex" }}>
        <Button variant="text" onClick={goBack} sx={{padding: "1rem 5rem",}}>
          Back
        </Button>
        <Button variant="text" onClick={handleSave} sx={{padding: "1rem 3rem",}}>
          Check Your Answer
        </Button>
      </div>
    </PreContainer>
  );
}

export default CodeBlock;
