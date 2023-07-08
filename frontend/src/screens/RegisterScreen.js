import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, Box, Grid, Typography, Button } from "@mui/material";

import { useRegisterUserMutation } from "../features/auth/authApi";
import withRoot from "../theme/withRoot";
import Progress from "../components/Progress";
import FormikField from "../components/FormikField";

function RegisterScreen() {
    const [registerUser, { isLoading, isSuccess, isError, error }] =
        useRegisterUserMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate("/u/dashboard");
        }
    }, [isSuccess, navigate]);

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
                            <FormikField
                                type={"email"}
                                label={"Email Address"}
                                formik={formik}
                                isError={isError}
                                error={error}
                            />
                            <FormikField
                                type={"password"}
                                label={"Password"}
                                formik={formik}
                                isError={false}
                                error={error}
                                visibility={true}
                            />
                            {isError && !error.message && <Typography color="red">Could not reach server</Typography>}
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
                                            to="/u/login"
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
