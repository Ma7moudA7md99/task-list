// * IMPORT MUI COMPONENTS
import {
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  TextField,
  Button,
  Box,
} from "@mui/material";
// * IMPORT COMPONENTS
import Todo from "./Todo";
// * IMPORT OTHERS
import { v4 as uuidv4 } from "uuid";
import TodoContext from "../Contexts/TodoContext";
import { useState, useContext, useEffect } from "react";
function MainList() {
  const { todos, setTodos } = useContext(TodoContext);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const todoJsx = todos.map((t) => <Todo key={t.id} todo={t} />);
  // * handle ADD NEW TODO action
  function handleAddTodo() {
    const newTodo = {
      id: uuidv4(),
      title: newTodoTitle,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setNewTodoTitle("");
  }
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
    console.log("useEffect Called !!");
  }, []);
  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          {/* CARD TITLE */}
          <Typography variant="h3" component="div">
            مهامى
          </Typography>
          <Divider sx={{ margin: "10px 0" }} />
          {/* ==== CARD TITLE ==== */}
          {/* CARD CONTENT */}
          <Box
            style={{
              maxHeight: "60vh",
              overflowY: "scroll",
              margin: "10px 0",
            }}
          >
            {todoJsx}
          </Box>
          {/* ==== CARD CONTENT ==== */}
          {/* ADD NEW TODO */}
          <Grid
            container
            spacing={2}
            sx={{ direction: "rtl", alignItems: "center" }}
          >
            <Grid size={8}>
              <TextField
                fullWidth
                label="عنوان المهمة"
                variant="standard"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
              />
            </Grid>
            <Grid size={4}>
              <Button
                variant="contained"
                fullWidth
                sx={{ height: "50px" }}
                onClick={handleAddTodo}
                disabled={newTodoTitle.length == 0}
              >
                إضافة مهمة
              </Button>
            </Grid>
          </Grid>

          {/* ==== ADD NEW TODO ==== */}
        </CardContent>
      </Card>
    </Container>
  );
}

export default MainList;
