import React, { useState } from "react";
import {
    Container,
    Box,
    Grid,
    Link,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    TextField,
    Typography,
    Button,
    FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import withRoot from "../../theme/withRoot";

function RegisterScreen() {
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };

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
                        padding: 5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        boxShadow: 8,
                    }}
                >
                    <Typography variant="h6" paddingBottom={2} color="primary">
                        Better Koinly
                    </Typography>
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        paddingBottom={2}
                    >
                        Create Your Account
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Password
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        endAdornment={
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
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
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
                                        href="#"
                                        variant="body2"
                                        underline="none"
                                    >
                                        Log in
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>
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
