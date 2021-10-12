import React from "react";
import LargeCard from "../components/cards/LargeCard";
import TopCards from "../components/cards/TopCards";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import * as Item from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Moment from "react-moment";
import ProjectTable from "../components/tables/ProjectTable";
import { API_BASE } from "../utils/Api";
import HeaderWithButton from "../components/header/HeaderWithButton";
import { useHistory } from "react-router-dom";

function Projects() {
  const history = useHistory();
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const loadNew = () => {
    history.push("/create-project");
  };

  const getProjects = async () => {
    
    const response = await fetch(`${API_BASE}/projects`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    setLoading(false);
    result && setProjects(result);
    console.log("Projects", result);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${API_BASE}/project/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    getProjects();
    console.log("Projects", result);
  };

  React.useEffect(() => {
    getProjects();
  }, []);

  const title = "PROJECTS";
  const user = {
    fullname: "Olusanya Michael",
    staff_id: "T64554",
    role: "Superadmin",
  };

  const infos = [
    {
      title: "Total",
      data: 5,
    },
    {
      title: "Approved",
      data: 15,
    },
    {
      title: "Querried",
      data: 2,
    },
    {
      title: "Disapproved",
      data: 20,
    },
  ];

  const columns = [
    {
      selector: "title",
      name: "Projects",
      sortable: true,
    },
    { selector: "description", name: "Lead Contractor", sortable: true },
    {
      selector: "created_at",
      name: "Created Date",
      sortable: true,
      ignoreRowClick: true,
      cell: (row) => {
        return <Moment fromNow>{row.created_at}</Moment>;
      },
    },
    {
      selector: "id",
      name: "Action",
      sortable: true,
      ignoreRowClick: true,
      cell: (row) => {
        return (
          <Item.Button
            onClick={() => handleDelete(row.id)}
            color="error"
            variant="contained"
          >
            Delete
          </Item.Button>
        );
      },
    },
  ];

  const data = React.useMemo(() => projects);

  return (
    <div>
      <div className="flex flex-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div className="dashboard-right">
          <HeaderWithButton
            handlClick={loadNew}
            title={title.toUpperCase()}
            
          />
          <h3 className="mx-5 mt-5 mb-3 font-bold text-gray-700 text-2xl">
            Projects
          </h3>
          {loading ? (
            <Box className="flex justify-center items-center" sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <div className="mx-5 flex flex-row justify-between items-center">
              {infos.map((info) => (
                <TopCards info={info} />
              ))}
            </div>
          )}
          <hr />
          <ProjectTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}

export default Projects;
