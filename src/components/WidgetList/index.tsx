import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {
  fetchAllWidgets,
  deleteWidget,
  Widget,
  findWidgetByName,
} from "../../lib/apiConnect";
import { Button, CircularProgress, Divider } from "@mui/material";
import WidgetDialog from "../WidgetDialog";
import WidgetDisplay from "../WidgetCard";

const WidgetList = (): JSX.Element => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [widgetDetail, setWidgetDetail] = useState<Widget>({
    name: "",
    price: 0,
    starRating: 0,
  });
  const [dialogMode, setDialogMode] = useState("create");
  const [isLoading, setIsLoading] = useState(false);
  const [displayDialog, setDisplayDialog] = useState(false);

  useEffect(() => {
    // I would have validated and catched any possible error in retrieving the widgets
    reloadWidgets();
  }, []);

  const handleDelete = async (name: string) => {
    setIsLoading(true);
    const response = await deleteWidget(name);
    if (response !== null) {
      setWidgets(await fetchAllWidgets());
      setIsLoading(false);
    } // else -> error handling
  };

  const reloadWidgets = async () => {
    // Same here, error handling would improve UX in case of backend error
    setWidgets(await fetchAllWidgets());
  };

  const openDetailView = async (name: string) => {
    const widget = await findWidgetByName(name);
    if (widget !== null) {
      // Open WidgetDialog in 'view' mode
      setDisplayDialog(true);
      setWidgetDetail(widget);
      setDialogMode("view");
    }
  };

  const openCreateView = () => {
    // Open WidgetDialog in 'create' mode
    setDialogMode("create");
    setDisplayDialog(true);
  };

  const closeDialog = () => setDisplayDialog(false); // Closes WidgetDialog

  return (
    <Stack
      spacing={4}
      sx={{ margin: "auto", maxWidth: 900, paddingTop: "4em", width: "100%" }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <Typography sx={{ textAlign: "Center" }} variant="h3">
          My Widgets
          <Divider orientation="vertical" flexItem />
        </Typography>
        <Button
          color="success"
          onClick={() => {
            openCreateView();
          }}
          variant="contained"
        >
          Create
        </Button>
      </Stack>
      {/* WidgetDialog component can handle both 'view' and 'create' actions */}
      <WidgetDialog
        closeDialog={closeDialog}
        displayDialog={displayDialog}
        dialogMode={dialogMode}
        widgetDetail={widgetDetail}
        reloadWidgets={reloadWidgets}
      />
      <Grid
        container
        justifyContent={isLoading ? "center" : "left"}
        spacing={3}
        sx={{ paddingRight: 4, width: "100%" }}
      >
        {isLoading ? (
          // I would have done a longer loading animation, maybe with a SetTimeout.
          // Updates happen so fast that you can barely see the loading icon.
          <CircularProgress />
        ) : (
          widgets.map((current, index) => (
            // WidgetCard can handle the Edit and Delete of each Widget listed
            <WidgetDisplay
              onDelete={handleDelete}
              viewDetail={openDetailView}
              key={index}
              widget={current}
            />
          ))
        )}
      </Grid>
    </Stack>
  );
};
//Test files are also in debt
export default WidgetList;
