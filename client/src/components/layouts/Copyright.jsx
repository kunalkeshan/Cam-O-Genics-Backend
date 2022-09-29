/**
 * Copyright Component 
 */

// Dependencies
import React from "react";
import { Typography, Link } from "@mui/material";
import { PROJECT_MAINTAINERS, SERVER_GITHUB_URL } from "../../data/constants";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" mt={8} {...props} component='div'>
            <Typography variant="caption" component='p'>
                Made with ☕+🧠 by <Link color="inherit" href={PROJECT_MAINTAINERS.Kunal.twitter} target="_blank">Kunal Keshan</Link>
                {' '} and <Link color="inherit" href={PROJECT_MAINTAINERS.Surendar.twitter} target="_blank">Surendar PD</Link>.
            </Typography>
            {'Copyright © '}
            <Link color="inherit" href={`${SERVER_GITHUB_URL}/blob/main/LICENSE`} target="_blank">
                CamOGenics
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;