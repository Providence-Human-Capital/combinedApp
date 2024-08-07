import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import useStaffingCompanies from "../Hr/hooks/useStaffingCompanies";
import Loading from "../../components/Loading.jsx/Loading";
import { formatDate } from "../Hr/pages/ApplicantsDetailedPage";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { API } from "../../../config";

const AdminOps = () => {
  const user = useSelector((state) => state.auth.user);

  const {
    data: companies,
    error: companiesError,
    isLoading: companiesLoading,
  } = useStaffingCompanies();

  const handleClearAllCompanyPatients = async (companyId) => {
    // alert("Company ID", companyId);

    if (user.role !== "admin") {
      Swal.fire({
        title: "Administrator Rights Required",
        text: "You are not allowed to perform this operation",
        icon: "info",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover these item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API}/api/staffing/employees/delete`, {
          method: "DELETE",
          body: JSON.stringify({
            company_id: companyId,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          console.log(response);
          Swal.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the item.",
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the item.",
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <BreadCrumb title={"Administrative Operations"} activeTab={"Admin"} />
      <section className="content">
        <div className="row">
          {companiesLoading ? (
            <Loading />
          ) : companiesError ? (
            <p className="text-danger">Error loading Companies</p>
          ) : (
            companies &&
            companies.map((company) => (
              <div class="col-md-3 col-12">
                <div class="media bg-white mb-20">
                  <span class="avatar status-success">
                    <span class="icon-Library fs-24">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </span>
                  </span>
                  <div class="media-body">
                    <p>
                      <strong>{company.name}</strong>
                      <time class="float-end" datetime="2017-07-14 20:00">
                        <span class="badge badge-xl badge-light">
                          <span
                            class="fw-600 text-primary"
                            style={{
                              fontFamily: "Poppins, sans-serif",
                            }}
                          >
                            {company.staffing_employees_count}
                          </span>
                        </span>
                      </time>
                    </p>
                    <p>
                      Company Code: {"  "}
                      {company.company_code}
                    </p>
                    <div class="d-inline-block pull-right mt-10">
                      <button
                        type="button"
                        class="btn btn-rounded btn-sm btn-success m-5"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        class="btn btn-rounded btn-sm btn-danger m-5"
                        onClick={() =>
                          handleClearAllCompanyPatients(company.id)
                        }
                      >
                        <i className="ti-trash"></i>
                        {"  "}
                        Delete All Patients Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default AdminOps;
