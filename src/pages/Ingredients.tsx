import { useEffect, useState, useCallback, useMemo } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useDish from "../hooks/useDish";
import BroadCardImage from "../components/BroadCardImage";
import Error from "../components/Error";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import Loading from "../components/Loading";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, selectedName: string, theme: Theme) {
  return {
    fontWeight:
      selectedName === name
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}

export default function Ingredients() {
  const { ingredient: searchIngredient } = useParams<{ ingredient: string }>();
  const [ingredient, setIngredient] = useState<string | undefined>(
    searchIngredient
  );
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useDish({
    endPoint: "list.php?i=list",
    title: "ingredients",
  });

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const newIngredient = event.target.value;
      setIngredient(newIngredient);
      navigate(`/ingredients/${newIngredient}`);
    },
    [navigate]
  );

  useEffect(() => {
    if (!searchIngredient && data?.data?.meals.length) {
      navigate(`/ingredients/${data.data.meals[0].strIngredient}`);
    } else if (searchIngredient) {
      setIngredient(searchIngredient);
    }
  }, [data, navigate, searchIngredient]);

  const menuItems = useMemo(
    () =>
      data?.data?.meals.map((meal: any) => (
        <MenuItem
          key={meal.strIngredient}
          value={meal.strIngredient}
          style={getStyles(meal.strIngredient, ingredient || "", theme)}
        >
          {meal.strIngredient}
        </MenuItem>
      )),
    [data, ingredient, theme]
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data?.data?.meals) {
    return <Error />;
  }

  return (
    <>
      <Helmet>
        <title>Ingredients</title>
      </Helmet>
      <BroadCardImage title="Select an Ingredient" />
      <section className="container mx-auto py-5 px-2 flex flex-row justify-center flex-wrap items-center">
        <Button sx={{ display: "block", mt: 2 }} onClick={handleOpen}>
          Open the Select Ingredients
        </Button>
        <FormControl sx={{ width: "100%", maxWidth: "400px" }}>
          <Select
            displayEmpty
            input={<OutlinedInput />}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Select Ingredient" }}
            value={ingredient || ""}
            onChange={handleChange}
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
          >
            <MenuItem disabled value="">
              <em>Select an Ingredient</em>
            </MenuItem>
            {menuItems}
          </Select>
        </FormControl>
      </section>
      <Outlet />
    </>
  );
}
