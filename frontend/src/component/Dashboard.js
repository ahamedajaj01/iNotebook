import React from 'react'
import Welcome from "./dashboardUi/Welcome"
import AddNotes from "./AddNotes";

export default function Dashboard(props) {
  const { showAlert,alert } = props;

  return (
    <div className="container mt-5">
   
      {/* Welcome Message */}
      <Welcome />

      {/* Divider */}
      <hr className="my-4" />

      {/* Add Note Form */}
      <div className="card shadow-sm p-4">
       
        <AddNotes showAlert={showAlert} alert={alert}/>
      </div>
    </div>
  );
}
