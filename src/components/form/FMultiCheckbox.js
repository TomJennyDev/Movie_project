import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

function FMultiCheckbox({ name, options, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option) =>
          field.value.includes(option)
            ? field.value.filter((value) => value !== option)
            : [...field.value, option];

        return (
          <FormGroup>
            {options?.map((option) => (
              <FormControlLabel
                key={option.id}
                control={
                  <Checkbox
                    checked={field.value.includes(option.id)}
                    onChange={() => field.onChange(onSelected(option.id))}
                  />
                }
                label={option.name}
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
}

export default FMultiCheckbox;
