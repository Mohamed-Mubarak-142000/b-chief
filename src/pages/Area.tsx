import { Outlet, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet-async";
import { useEffect, useState, useCallback, useMemo } from "react";
import useDish from "../hooks/useDish";
import Error from "../components/Error";
import BroadCardImage from "../components/BroadCardImage";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";

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

const getStyles = (name: string, selectedName: string[], theme: Theme) => ({
  fontWeight:
    selectedName.indexOf(name) === -1
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
});

export default function Area() {
  const navigate = useNavigate();
  const { area } = useParams();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [areaLabel, setArea] = useState<string | null>(null);
  const { data, isLoading, isError } = useDish({
    endPoint: "list.php?a=list",
    title: "areas",
  });

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!area && data?.data?.meals.length) {
      const defaultArea = data.data.meals[0].strArea;
      navigate(`/area/${defaultArea}`);
    } else if (area) {
      setArea(area);
    }
  }, [data, navigate, area]);

  const handleChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const newArea = event.target.value;
      setArea(newArea);
      navigate(`/area/${newArea}`);
    },
    [navigate]
  );

  const menuItems = useMemo(
    () =>
      data?.data?.meals.map((area: any, index: number) => (
        <MenuItem
          key={index}
          value={area.strArea}
          style={getStyles(area.strArea, [areaLabel || ""], theme)}
        >
          {area.strArea}
        </MenuItem>
      )),
    [data, areaLabel, theme]
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Helmet>
        <title>Area</title>
      </Helmet>

      <BroadCardImage title="Select a Country or Region" />
      <section className="container mx-auto flex flex-row justify-center flex-wrap items-center">
        <Button sx={{ display: "block", mt: 2 }} onClick={handleOpen}>
          Open the Select Ingredients
        </Button>

        <FormControl sx={{ m: 1, width: "45%", mt: 3 }}>
          <Select
            displayEmpty
            input={<OutlinedInput />}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
            value={areaLabel || ""}
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

        <Outlet />
      </section>
    </>
  );
}
