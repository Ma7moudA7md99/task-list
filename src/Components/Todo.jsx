import {
  IconButton,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import TodoContext from "../Contexts/TodoContext";
import { useContext, useState } from "react";
function Todo({ todo }) {
  const { todos, setTodos } = useContext(TodoContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  // * handle CHECK ( COMPLETE ) Action
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  function UpdateDialogOpen() {
    setShowUpdateDialog(true);
  }
  function UpdateDialogClose() {
    setShowUpdateDialog(false);
  }
  function DeleteDialogOpen() {
    setShowDeleteDialog(true);
  }
  function DeleteDialogClose() {
    setShowDeleteDialog(false);
  }
  // ! handle DELETE Action
  function handleDeleteClick() {
    const updatedTodos = todos.filter((t) => {
      return t.id == todo.id ? false : true;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  // * handle UPDATE Action
  function handleUpdateClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        return { ...t, title: newTodo.title, details: newTodo.details };
      } else {
        return t;
      }
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowUpdateDialog(false);
  }
  return (
    <Card
      className="todo"
      sx={{
        backgroundColor: "#0047a4",
        margin: "1rem 0",
        color: "white",
        direction: "rtl",
      }}
    >
      <Grid container spacing={2}>
        <Grid size={8}>
          <CardContent sx={{ textAlign: "right" }}>
            <Typography variant="h5" component="div">
              {todo.title}
            </Typography>
            <Typography variant="p" color="text.secondary">
              {todo.details}
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          size={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardActions>
            <IconButton
              className="iconButton"
              size="small"
              onClick={handleCheckClick}
              sx={{
                color: todo.isCompleted ? "white" : "green",
                background: todo.isCompleted ? "green" : "white",
              }}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              className="iconButton"
              size="small"
              sx={{ color: "blue", background: "white" }}
              onClick={UpdateDialogOpen}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              className="iconButton"
              size="small"
              color="error"
              sx={{ background: "white" }}
              onClick={DeleteDialogOpen}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Grid>
      </Grid>
      {/* UPDATE ALERT DIALOG */}
      <Dialog
        open={showUpdateDialog}
        onClose={UpdateDialogClose}
        sx={{ direction: "rtl" }}
      >
        <DialogTitle sx={{ color: "black" }}>تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="عنوان المهمة"
            type="text"
            fullWidth
            variant="standard"
            value={newTodo.title}
            onChange={(e) => {
              setNewTodo({ ...newTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="details"
            label="وصف المهمة"
            type="text"
            fullWidth
            variant="standard"
            value={newTodo.details}
            onChange={(e) => {
              setNewTodo({ ...newTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={UpdateDialogClose}>إغلاق</Button>
          <Button onClick={handleUpdateClick}>تأكيد</Button>
        </DialogActions>
      </Dialog>
      {/* ==== UPDATE ALERT DIALOG ==== */}
      {/* DELETE ALERT DIALOG */}
      <Dialog
        open={showDeleteDialog}
        onClose={DeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
        sx={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: "black" }}>
          هل ترغب فى حذف المهمة ؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكن التراجع فى حالة حذف المهمة !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={DeleteDialogClose} autoFocus>
            إغلاق
          </Button>
          <Button onClick={handleDeleteClick} color="error">
            نعم قم بالحذف !
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==== DELETE ALERT DIALOG ==== */}
    </Card>
  );
}

export default Todo;
