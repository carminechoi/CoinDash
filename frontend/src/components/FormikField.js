import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function FormikField({
    type,
    label,
    formik,
    isError,
    error,
    visibility = false,
}) {
    const [showField, setShowField] = useState(false);

    return (
        <TextField
            fullWidth
            id={type}
            name={type}
            type={visibility ? (showField ? "text" : "password") : "text"}
            label={label}
            value={formik.values[type]}
            onChange={formik.handleChange}
            error={
                (formik.touched[type] && Boolean(formik.errors[type])) ||
                isError
            }
            helperText={
                isError
                    ? error.data.message
                    : formik.touched[type] && formik.errors[type]
            }
            InputProps={{
                autoComplete: type,
                endAdornment: visibility && (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle visibility"
                            onClick={() => setShowField((show) => !show)}
                            onMouseDown={(event) => {
                                event.preventDefault();
                            }}
                            edge="end"
                        >
                            {showField ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            sx={{ my: 2 }}
        />
    );
}

export default FormikField;
