import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Widget, saveWidget } from "../../lib/apiConnect";

export interface WidgetDialogProps {
  reloadWidgets: any;
  closeDialog: any;
  dialogMode: string;
  widgetDetail: Widget;
  displayDialog: boolean;
}

const WidgetDialog = ({
  reloadWidgets,
  dialogMode,
  widgetDetail,
  displayDialog,
  closeDialog,
}: WidgetDialogProps): JSX.Element => {
  const [newWidget, setNewWidget] = useState<Widget>({
    name: "",
    price: 0,
    starRating: 0,
  });
  // I would have improved the usage of public properties

  const handleSubmit = async () => {
    const response = await saveWidget(newWidget);
    if (response !== null) {
      closeDialog();
      reloadWidgets();
    } // Error handling in debt
  };

  // Tried to separate both View and Create modes into const modules
  // to keep the main return() function cleaner. Same thing with action footers.

  const viewModule = () => {
    return (
      <>
        <Typography gutterBottom variant="h5" component="div">
          {widgetDetail.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${widgetDetail.price}
        </Typography>
        <Rating
          size="small"
          name="read-only"
          value={widgetDetail.starRating}
          readOnly
        />
      </>
    );
  };

  // I would have done validations for name and price fields.
  // StarRate doesn't need it because the ui component limitates the usage
  const createModule = () => {
    return (
      <>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="Name"
          label="Name..."
          type="text"
          fullWidth
          variant="standard"
          onChange={(event) =>
            setNewWidget({ ...newWidget, name: event.target.value })
          }
        />
        <TextField
          required
          margin="dense"
          id="price"
          name="Price"
          label="Price..."
          type="number"
          fullWidth
          variant="standard"
          onChange={(event) =>
            setNewWidget({ ...newWidget, price: Number(event.target.value) })
          }
        />
        <Rating
          name="simple-controlled"
          id="starRating"
          onChange={(event, newValue) => {
            setNewWidget({ ...newWidget, starRating: Number(newValue) });
          }}
        />
      </>
    );
  };

  // Would have developed an 'error' view for the edge case of the dialogMode
  // falling into a different status.
  const switchView = () => {
    switch (dialogMode) {
      case "view":
        return viewModule();
      case "create":
        return createModule();
      default:
        return <>Error</>;
    }
  };

  const createActions = () => {
    //Actions for the Create mode
    return (
      <>
        <Button
          color="success"
          onClick={() => {
            handleSubmit();
          }}
        >
          Create
        </Button>
        <Button onClick={() => closeDialog()}>Cancel</Button>
      </>
    );
  };

  const viewActions = () => {
    //Action for View mode
    return <Button onClick={() => closeDialog()}>Close</Button>;
  };

  const switchActions = () => {
    switch (dialogMode) {
      case "view":
        return viewActions();
      case "create":
        return createActions();
      default:
        return <>Error</>;
    }
  };

  // A clean return() method
  // Maybe more information to the user would improve UX
  // Like telling * fields are required, notification for the requests, etc.
  return (
    <Dialog open={displayDialog} onClose={() => closeDialog()}>
      <DialogTitle>New Widget</DialogTitle>
      <DialogContent>{switchView()}</DialogContent>
      <DialogActions>{switchActions()}</DialogActions>
    </Dialog>
  );
};
// Testing files in debt.
export default WidgetDialog;

