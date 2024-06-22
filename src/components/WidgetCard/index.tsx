import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { updateWidget, Widget } from "../../lib/apiConnect";
import {
  Box,
  Button,
  CardActions,
  Divider,
  IconButton,
  Rating,
  TextField,
} from "@mui/material";
import { Cancel, Delete, Edit, RemoveRedEye, Save } from "@mui/icons-material";

export interface WidgetCardProps {
  widget: Widget;
  onDelete: any;
  viewDetail: any;
}

const WidgetCard = ({
  widget,
  onDelete,
  viewDetail,
}: WidgetCardProps): JSX.Element => {
  const [currentWidget, setCurrentWidget] = useState(widget);
  const [tempWidget, setTempWidget] = useState(widget);
  const [cardMode, setCardMode] = useState("view");

  // Error handling for the update method would do better
  // And maybe a toast or loading notification to show the status
  async function saveChanges() {
    const response = await updateWidget(tempWidget);
    setCurrentWidget(response);
    setCardMode("view");
  }

  // View, Edit and Delete modes are separated into modules to keep code maintenance easier
  const viewModule = () => {
    return (
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {currentWidget.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${currentWidget.price.toFixed(2)}
        </Typography>
        <Rating
          size="small"
          name="read-only"
          value={currentWidget.starRating}
          readOnly
        />
      </CardContent>
    );
  };

  const viewActions = () => {
    return (
      <CardActions disableSpacing>
        <IconButton
          onClick={() => viewDetail(currentWidget.name)}
          color="info"
          size="small"
          aria-label="View"
        >
          <RemoveRedEye />
        </IconButton>
        <IconButton
          onClick={() => setCardMode("edit")}
          color="warning"
          size="small"
          aria-label="Edit"
        >
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => setCardMode("delete")}
          color="error"
          size="small"
          aria-label="Delete"
        >
          <Delete />
        </IconButton>
      </CardActions>
    );
  };

  const editActions = () => {
    return (
      <CardActions disableSpacing>
        <IconButton
          onClick={() => saveChanges()}
          color="primary"
          size="small"
          aria-label="Save"
        >
          <Save />
        </IconButton>
        <IconButton
          color="error"
          size="small"
          aria-label="Cancel"
          onClick={() => {
            setTempWidget(currentWidget);
            setCardMode("view");
          }}
        >
          <Cancel />
        </IconButton>
      </CardActions>
    );
  };

  const editModule = () => {
    return (
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {currentWidget.name}
        </Typography>
        <TextField
          size="small"
          value={tempWidget.price}
          id="standard-basic"
          label="Price"
          variant="standard"
          type="number"
          onChange={(event) =>
            setTempWidget({ ...tempWidget, price: Number(event.target.value) })
          }
        />
        <Rating
          size="small"
          name="simple-controlled"
          value={tempWidget.starRating}
          onChange={(event, newValue) => {
            setTempWidget({ ...tempWidget, starRating: Number(newValue) });
          }}
        />
      </CardContent>
    );
  };

  const deleteActions = () => {
    return (
      <CardActions disableSpacing>
        <Box>
          <Typography gutterBottom variant="caption" display="block">
            Are you sure you want to delete?
          </Typography>
          <Stack spacing={2} direction="row">
            <Button
              onClick={() => onDelete(currentWidget.name)}
              variant="contained"
              color="error"
              size="small"
            >
              Delete
            </Button>
            <Button
              onClick={() => setCardMode("view")}
              variant="outlined"
              color="info"
              size="small"
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </CardActions>
    );
  };

  const switchCardMode = () => {
    switch (cardMode) {
      case "view":
      case "delete":
        return viewModule();
      case "edit":
        return editModule();
      default:
        return <>Error</>;
    }
  };

  const switchActions = () => {
    switch (cardMode) {
      case "view":
        return viewActions();
      case "edit":
        return editActions();
      case "delete":
        return deleteActions();
      default:
        break;
    }
  };

  // Main return methos is cleaner
  return (
    <Grid item xs={4}>
      <Card>
        {switchCardMode()}
        <Divider variant="middle" component="div" />
        {switchActions()}
      </Card>
    </Grid>
  );
};
// Testing files in debt.
export default WidgetCard;
