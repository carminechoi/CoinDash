import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, Box, Grid, Typography, Button } from "@mui/material";

import { useLoginUserMutation } from "../features/auth/authApi";
import withRoot from "../theme/withRoot";
import Progress from "../components/Progress";
import FormikField from "../components/FormikField";

function LoginScreen() {
    const [loginUser, { isLoading, isSuccess, isError, error }] =
        useLoginUserMutation();
    const { userId } = useSelector((state) => state.userState);
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess || userId) navigate("/u/dashboard");
    }, [isSuccess, navigate, userId]);

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Enter a valid email")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            loginUser(values);
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
                            Welcome back
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
                                Log in
                            </Button>
                            <Grid container justifyContent="flex-start">
                                <Grid item>
                                    <Typography variant="body2">
                                        Don't have an account?{" "}
                                        <Link
                                            to="/u/signup"
                                            variant="body2"
                                            underline="none"
                                        >
                                            Sign up
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

export default withRoot(LoginScreen);
