import { TextField } from "@mui/material";

interface Props {
  name: string;
  type: string;
  label?: string;
}

const CustomInput = ({ name, type, label }: Props) => {
  return (
    <TextField
      name={name}
      type={type}
      label={label}
      margin="normal"
      InputLabelProps={{
        style: {
          color: "white",
        },
      }}
      InputProps={{
        style: {
          width: "400px",
          borderRadius: "10px",
          color: "white",
        },
      }}
    />
  );
};

export default CustomInput;
