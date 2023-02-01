import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Container,
    Box,
    Grid,
    Link,
    InputAdornment,
    IconButton,
    TextField,
    Typography,
    Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import withRoot from "../theme/withRoot";
import { useRegisterUserMutation } from "../features/auth/authApi";
import Progress from "../components/Progress";

function RegisterScreen() {
    const [registerUser, { isLoading, isSuccess, isError, error }] =
        useRegisterUserMutation();

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Enter a valid email")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password should be of minimum 8 characters length")
            .required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            registerUser(values);
        },
    });

    useEffect(() => {
        if (isSuccess) {
            // navigate("/u/dashboard");
        }
    }, [isSuccess, navigate]);

    return (
        <Container component="main" maxWidth="xs">
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: "100vh" }}
            >
                <Box
                    sx={{
                        marginTop: 8,

                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        boxShadow: 8,
                    }}
                >
                    {isLoading && <Progress />}
                    <Box
                        sx={{
                            padding: 5,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            variant="h6"
                            paddingBottom={2}
                            color="primary"
                        >
                            Better Koinly
                        </Typography>
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            paddingBottom={2}
                        >
                            Create Your Account
                        </Typography>
                        <form onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                            <TextField
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={
                                    (formik.touched.email &&
                                        Boolean(formik.errors.email)) ||
                                    isError
                                }
                                helperText={
                                    isError
                                        ? error.data.message
                                        : formik.touched.email &&
                                          formik.errors.email
                                }
                                InputProps={{ autoComplete: "email" }}
                                sx={{ my: 2 }}
                            />

                            <TextField
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.password &&
                                    Boolean(formik.errors.password)
                                }
                                helperText={
                                    formik.touched.password &&
                                    formik.errors.password
                                }
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    autoComplete: "new-password",
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() =>
                                                    setShowPassword(
                                                        (show) => !show
                                                    )
                                                }
                                                onMouseDown={(event) => {
                                                    event.preventDefault();
                                                }}
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mt: 1 }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                size="large"
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    py: 1.4,
                                    textTransform: "none",
                                }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-start">
                                <Grid item>
                                    <Typography variant="body2">
                                        Already have an account?{" "}
                                        <Link
                                            href="/u/login"
                                            variant="body2"
                                            underline="none"
                                        >
                                            Log in
                                        </Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Box>
                <Typography
                    variant="body2"
                    align="center"
                    color="text.secondary"
                    sx={{ mt: 4 }}
                >
                    When you create a Better Koinly account, you
                </Typography>
                <Typography
                    variant="body2"
                    align="center"
                    color="text.secondary"
                >
                    agree to theTerms and Privacy Policy.
                </Typography>
            </Grid>
        </Container>
    );
}

export default withRoot(RegisterScreen);
