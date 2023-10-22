import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import {
  styled,
  createTheme,
  ThemeProvider,
  alpha,
} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useDispatch } from "react-redux";
import { axiosCarById, updateCar } from "../../api";
import { Link } from "react-router-dom";

const theme = createTheme();

const brands = [
  "BWM",
  "Mercedes",
  "Audi",
  "Porsche",
  "Honda",
  "Toyota",
  "Volvo",
];
const models = [
  "M4 Competition",
  "Benz",
  "A4",
  "Taycan",
  "M8 Sedan",
  "X5 Jeep",
];
const randomRole = () => {
  return randomArrayItem(brands);
};
const randomModel = () => {
  return randomArrayItem(models);
};

localStorage.setItem("brands", JSON.stringify(brands));

const value = JSON.parse(localStorage.getItem("brands"));
console.log(value);

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const initialRows = [
  {
    id: randomId(),
    name: "Bwm M-4 Sports",
    brand: "BWM",
    joinDate: randomCreatedDate(),
    model: "M-4",
  },
  {
    id: randomId(),
    name: "Mercedes Benz C4",
    brand: "Mercedes",
    joinDate: randomCreatedDate(),
    model: "Benz",
  },
  {
    id: randomId(),
    name: "Audi A3 Sedan",
    brand: randomRole(),
    joinDate: randomCreatedDate(),
    model: randomModel(),
  },
  {
    id: randomId(),
    name: "Porsche",
    brand: randomRole(),
    joinDate: randomCreatedDate(),
    model: randomModel(),
  },
  {
    id: randomId(),
    name: "Jaguar",
    brand: randomRole(),
    joinDate: randomCreatedDate(),
    model: randomModel(),
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Link to={"/addnewcar"} style={{ textDecoration: "none" }}>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add a New Car
        </Button>
      </Link>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [search, setSearch] = React.useState("");
  React.useEffect(() => {
    window.localStorage.setItem("brands", JSON.stringify(brands));
  }, [brands]);
  const dispatch = useDispatch();

  const handleSubmitSearch = (text) => {
    text.preventDefault();
    setSearch(text);
    dispatch();

    setSearch("");
  };
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  React.useEffect(() => {
    localStorage.setItem("delete", JSON.stringify(handleDeleteClick()));
    dispatch(handleDeleteClick());
  }, []);

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "name", headerName: "Car Name", width: 180, editable: true },
    {
      field: "brand",
      headerName: "Brand",
      type: "singleSelect",
      width: 80,
      align: "left",
      headerAlign: "left",
      editable: true,
      valueOptions: ["BWM", "AUDI", "Mercedes"],
    },
    {
      field: "model",
      headerName: "Model",
      width: 220,
      editable: true,
      type: "singleSelect",
      valueOptions: ["M-4", "A3", "Benz"],
    },
    {
      field: "Model Year",
      headerName: "Model Year",
      type: "date",
      width: 180,
      editable: true,
    },
    { field: "plate", headerName: "License Plate", width: 180, editable: true },
    {
      field: "actions",
      type: "actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          weight: 700,
          height: 700,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          onChange={(e) => setSearch(e.target.value)}
        >
          {initialRows.map((item) => (
            <td>{item.name}</td>
          ))}
        </DataGrid>
      </Box>
    </ThemeProvider>
  );
}
