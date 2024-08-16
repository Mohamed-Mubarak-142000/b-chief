import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useDish from "../hooks/useDish";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Theme, useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import BroadCardImage from "../components/BroadCardImage";
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

export default function Categories() {
  const { category: searchCategory } = useParams<{ category: string }>();
  const [category, setCategory] = useState<string>(searchCategory || "");
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useDish({
    endPoint: "categories.php",
    title: "categories",
  });

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!searchCategory && data?.data?.categories.length) {
      const defaultCategory = data.data.categories[0].strCategory;
      navigate(`/categories/${defaultCategory}`);
    } else if (searchCategory) {
      setCategory(searchCategory);
    }
  }, [data, navigate, searchCategory]);

  const handleChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const newCategory = event.target.value;
      setCategory(newCategory);
      navigate(`/categories/${newCategory}`);
    },
    [navigate]
  );

  const menuItems = useMemo(
    () =>
      data?.data?.categories.map((category: any) => (
        <MenuItem
          key={category.idCategory}
          value={category.strCategory}
          style={getStyles(category.strCategory, category.strCategory, theme)}
        >
          {category.strCategory}
        </MenuItem>
      )),
    [data, category, theme]
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading categories. Please try again later.</div>;
  }

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <BroadCardImage title="Select a Category" />
      <section className="container mx-auto py-5 flex flex-row justify-center flex-wrap items-center">
        <Button sx={{ display: "block", mt: 2 }} onClick={handleOpen}>
          Open the Select Categories
        </Button>
        <FormControl sx={{ width: "100%", maxWidth: "400px" }}>
          <Select
            displayEmpty
            input={<OutlinedInput />}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Select Category" }}
            value={category}
            onChange={handleChange}
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
          >
            {menuItems}
          </Select>
        </FormControl>
        <Outlet />
      </section>
    </>
  );
}
