import React from "react";
import FlexBetween from "components/FlexStyle";
import Header from "components/Header";
import { DownloadOutlined, Email, PointOfSale, PersonAdd, Traffic } from "@mui/icons-material";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import reportUrl from "assets/Report.xlsx";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
       <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            onClick={() => {
              const link = document.createElement("a");
              link.href = reportUrl;
              link.download = "Report.xlsx";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween> 

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
         <StatBox
          title="Total Customers"
          // value={data && data.totalCustomers}
         
          icon={<Email sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />
        <StatBox
          title="Sales Today"
          // value={data && data.todayStats.totalSales}
        
          icon={<PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          {/* <OverviewChart view="sales" isDashboard={true} /> */}
        </Box>
        <StatBox
          title="Monthly Sales"
          // value={data && data.thisMonthStats.totalSales}
          
          icon={<PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />
        <StatBox
          title="Yearly Sales"
          // value={data && data.yearlySalesTotal}
         
          icon={<Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        /> 

        {/* ROW 2 */}
         <Box
  gridColumn="span 8"
  gridRow="span 3"
>
  <DataGrid
    loading={isLoading || !data}
    getRowId={(row) => row._id}
    rows={(data && data.transactions) || []}
    columns={columns}
    sx={{
      "& .MuiDataGrid-root": {
        border: "none",
        borderRadius: "5rem",
      },
      "& .MuiDataGrid-cell": {
        borderBottom: "none",
      },
      "& .MuiDataGrid-columnHeaders": {
        backgroundColor: theme.palette.background.alt,
        color: theme.palette.secondary[100],
        borderBottom: "none",
      },
      "& .MuiDataGrid-virtualScroller": {
        backgroundColor: theme.palette.background.alt,
      },
      "& .MuiDataGrid-footerContainer": {
        backgroundColor: theme.palette.background.alt,
        color: theme.palette.secondary[100],
        borderTop: "none",
      },
      "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
        color: `${theme.palette.secondary[200]} !important`,
      },
    }}
  />
</Box> 






   

 <Box
  gridColumn="span 4"
  gridRow="span 3"
  backgroundColor={theme.palette.background.alt}
  p="1.6rem"
  borderRadius="0.8rem"
  sx={{
    "& .MuiTypography-root": {
      color: theme.palette.secondary[100],
    },
    "& .MuiTypography-body2": {
      color: theme.palette.secondary[200],
      fontSize: "0.8rem",
      marginTop: "1rem",
    },
  }}
>
  {/* <Typography variant="h6">Sales By Category</Typography>
  <BreakdownChart isDashboard={true} />
  <Typography variant="body2">
    Breakdown of real states and information via category for revenue made for this year and total
    sales.
  </Typography> */}
</Box> 

      </Box>
    </Box>
  );
};

export default Dashboard;

