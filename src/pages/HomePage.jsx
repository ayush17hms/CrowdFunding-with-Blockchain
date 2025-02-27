import React, { useEffect } from "react";

// UI imports
import { Stack } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

// [block-chain] smart-contract related imports..
import {
  getDeployedCampaigns,
  getCampaignsSummary,
} from "../../utils/getCampaigns";

// local imports..
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CampaignCard from "../components/CampaignCard";

function HomePage() {
  // for navigation..
  const navigate = useNavigate();

  // hooks..
  const [campaignsList, setCampaignsList] = React.useState([]);

  useEffect(() => {
    let ignore = false;
  
    const fetchData = async () => {
      try {
        console.log("Fetching campaigns...");
        const deployedCampaignsList = await getDeployedCampaigns();
        
        if (!ignore) {
          const summaries = await getCampaignsSummary(deployedCampaignsList);
          setCampaignsList(summaries);
          console.log("Fetched campaigns:", summaries);
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
  
    fetchData();
  
    return () => {
      ignore = true; // Prevent updates after unmount
    };
  }, []);
  

  return (
    <Box className="App">
      <NavBar />
      {/* <Stack direction="row" spacing={2}></Stack> */}
      <CssBaseline />
      <Container
        component="main"
        sx={{ mt: 4, mb: 2 }}
        justifyContent="center"
        maxWidth="md"
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            🧑‍🤝‍🧑 Crowd Help :💰
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {"Get Help from Crowd..!!"}
            {" Raise a campaign to help the needy."}
          </Typography>
          <Typography variant="body1">Welcome 👋 to the community.</Typography>
          <Typography variant="body1">[ONLY] Core functionalities done 🚧. More features on the way..!! 🏃 </Typography>
        </Box>
        <Box sx={{ mt: 4, mb: 2 }}>
          <Stack>
            <Stack
              direction={"row"}
              justifyContent="space-between"
              alignItems="center"
              // width={10}
            >
              <Box>
                <Typography variant="h5">
                  Take part in active campaigns..
                </Typography>
                <Typography variant="caption">
                  Top {campaignsList.length} recent campaigns..
                </Typography>
              </Box>
              {/* <Button onClick={() => navigate("/active-campaigns")}>
                View more
              </Button> */}
            </Stack>
            <Container sx={{ py: 2 }} maxWidth="md">
              {/* End hero unit */}
              {/* load as long as data is not fetched. */}
              {campaignsList.length == 0 && (
                <CircularProgress color="success" />
              )}
              <Grid container spacing={4}>
                {campaignsList.map((activeCampaign, idx) => (
                  <Grid item key={idx} xs={12} sm={6} md={4}>
                    <CampaignCard details={activeCampaign} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Stack>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export default HomePage;
